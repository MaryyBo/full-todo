const { RefreshToken } = require('../models');
const { REFRESH_EXPIRES_TIME } = require ('../configs/constants')

module.exports.deleteExpiredRefreshTokens = async (req, res, next) => {
    try {
        const expiredTokenCreationDate = (new Date()).getSeconds() - REFRESH_EXPIRES_TIME;
        const expiredDateTime = (new Date()).setSeconds(expiredTokenCreationDate);

        const userExpiredRefreshTokens = await RefreshToken.deleteMany({
            createdAt: { $lt: expiredDateTime } 
        })

        return res.status(200).send({ data: userExpiredRefreshTokens })
    } catch (error) {
        next(error);
    }
}