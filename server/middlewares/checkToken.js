const { verifyAccessToken } = require('../services/createSession')

module.exports.checkToken = async (req, res, next) => {
    try {

        const { headers: { authorization } } = req;
        // console.log(headers);

        const [, token] = authorization.split(' '); //отримуємо ['Bearer', 'eyj...']
        console.log('start token_check', token);
        // const { params: { token } } = req;
        const payload = await verifyAccessToken(token);

        console.log('token_check', payload);
        req.tokenPayload = payload;
        next();

    } catch (error) {
        next(error)
    }
}