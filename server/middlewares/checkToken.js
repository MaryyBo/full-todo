const { verifyAccessToken } = require('../services/createSession')
const RefreshTokenError = require('../errors/RefreshTokenError')

module.exports.checkToken = async (req, res, next) => {
    try {
        const { headers: { authorization } } = req;

        if (!authorization) {
            throw new RefreshTokenError('Authentication needed');
        }
        const [, token] = authorization.split(' ');

        const payload = await verifyAccessToken(token);

        req.tokenPayload = payload;

        next();


        // const { headers: { authorization } } = req;

        // console.log('middleware checkToken', authorization);

        // if (!authorization) {
        //     console.log('no authorization');
        //     throw new RefreshTokenError('Authentication needed');
        // }

        // const [, token] = authorization.split(' '); //отримуємо ['Bearer', 'eyj...']
        // console.log('start token_check', token);
        // // const { params: { token } } = req;
        // const payload = await verifyAccessToken(token);
        // console.log(111111111);
        // console.log('token_check', payload);
        // req.tokenPayload = payload;
        // next();

    } catch (error) {
        next(error)
    }
}