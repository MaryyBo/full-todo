const { User, RefreshToken } = require("../models");
const bcrypt = require('bcryptjs');
const NotFoundError = require('../errors/NotFound')
const { createAccessToken, verifyAccessToken, createRefreshToken, verifyRefreshToken } = require('../services/createSession')
const RefreshTokenError = require('../errors/RefreshTokenError')


module.exports.registrationUser = async (req, res, next) => {
    try {
        const { body, passwordHash } = req;
        const createdUser = await User.create({ ...body, passwordHash });

        const token = await createAccessToken({ userId: createdUser._id, email: createdUser.email });


        return res.status(201).send({ data: createdUser, tokens: { token } })
    } catch (error) {
        next(error)
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        // 1. Дістати з body http-запиту логін - (email, password)

        const { body } = req;

        // 2. Перевіряємо чи існує взагалі юзер з таким email

        const foundUser = await User.findOne({
            email: body.email
        });

        // 3. Якщо юзер існує, перевіряємо пароль на правильність:
        // Якщо пароль вірний - логінимо юзера
        // Якщо пароль не вірний викидуємо помилку

        if (foundUser) {
            const result = await bcrypt.compare(
                body.password,
                foundUser.passwordHash);

            if (!result) {
                throw new NotFoundError('Incorrect password');
            }

            const accessToken = await createAccessToken({
                userId: foundUser._id,
                email: foundUser.email
            });

            const refreshToken = await createRefreshToken({
                userId: foundUser._id,
                email: foundUser.email
            });

            await RefreshToken.create({
                token: refreshToken,
                userId: foundUser._id
            })

            return res.status(201).send({ data: foundUser, tokens: { accessToken, refreshToken } })

            // return res.status(200).send({ data: foundUser })
        } else {
            throw new NotFoundError('Incorrect email')
        }

    } catch (error) {
        next(error)
    }
}


module.exports.checkAuth = async (req, res, next) => {
    try {

        const { tokenPayload: { userId } } = req;

        const foundUser = await User.findOne({
            _id: userId
        })

        return res.status(200).send({ data: foundUser })

    } catch (error) {
        next(error)
    }
}

module.exports.refreshSession = async (req, res, next) => {

    const { body: { refreshToken } } = req;

    let verifyResult;
    try { // Перевіряємо, чи взагалі валідний refresh Token
        verifyResult = await verifyRefreshToken(refreshToken);
        // console.log(verifyResult);

    } catch (error) {

        const newError = new RefreshTokenError('Invalid refresh token error');
        return next(newError);
    }

    try { // Виконується логіка оновлення сесії
        /*
        Access Token - живе мало.Багаторазовий. Саме ним ми супроводжуємо всі наші запити
        Refresh Token - жиіе багатою. Одноразовий. Призначений для оновлення пари токенів. 

        Приходить запис з AT
        - AT валідний --> виконуємо запит
        - AT не валідний:
         1. Відповідаємо певним кодом помилки
         2. У відповідь на цю помилку, фронт надсилає RT
            - якщо RT валідний --> рефрешимо сессію, видамо нову пару токенів
            - якщо RT НЕ валідний --> перенаправляємо користувача на аутентифікацію
        */

        if (verifyResult) {

            const user = await User.findOne({ _id: verifyResult.userId });

            const oldRefreshTokenfromDB = await RefreshToken.findOne({ $and: [{ token: refreshToken }, { userId: user._id }] })

            if (oldRefreshTokenfromDB) {

                await RefreshToken.deleteOne({ $and: [{ token: refreshToken }, { userId: user._id }] })//удалити старий refreshToken

                const newAccessToken = await createAccessToken({
                    userId: user._id,
                    email: user.email
                });

                const newRefreshToken = await createRefreshToken({
                    userId: user._id,
                    email: user.email
                });

                await RefreshToken.create({
                    token: newRefreshToken,
                    userId: user._id
                })

                return res.status(200).send({
                    tokens: {
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken
                    }
                })
            }

        } else {
            return res.status(401).send({ error: 'Invalid token' })
        }



    } catch (error) {
        next(error)
    }
}