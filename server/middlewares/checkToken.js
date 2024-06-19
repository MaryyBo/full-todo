const {verifyToken} = require('../services/createSession')

module.exports.checkToken = async (req, res, next) => {
    try {

        const { headers: { authorization } } = req;
        // console.log(headers);
        const [, token] = authorization.split(' '); //отримуємо ['Bearer', 'eyj...']
        console.log(token);

        // const { params: { token } } = req;
        const payload = await verifyToken(token);

        req.tokenPayload = payload;
        next();

    } catch (error) {
        next(error)
    }
}