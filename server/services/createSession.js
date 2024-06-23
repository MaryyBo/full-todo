const { promisify } = require('util')
const jwt = require('jsonwebtoken');
const promisifyJWTSign = promisify(jwt.sign);
const promisifyJWTVerify = promisify(jwt.verify);
const {REFRESH_SECRET, ACCESS_SECRET, REFRESH_EXPIRES_TIME, ACCESS_EXPIRES_TIME} = require ('../configs/constants')


// const payload = {
//     userId,
//     email
//     //тут можна зберігати - геолокація, роль користувача, відбиток пальця, ip адреса, інфо про пристрій, операційну систему
// };


// const createdToken = promisifyJWTSign(payload,secret, {
//     expiresIn: EXPIRES_TIME
// })

// Методи для ACCSESS TOKEN
module.exports.createAccessToken = async({ userId, email }) => 
    await promisifyJWTSign({ userId, email }, ACCESS_SECRET, {
    expiresIn: ACCESS_EXPIRES_TIME
});

module.exports.verifyAccessToken = async (token) => 
    await promisifyJWTVerify(token, ACCESS_SECRET);

// Методи для REFRESH TOKEN
module.exports.createRefreshToken = async({ userId, email }) => 
    await promisifyJWTSign({ userId, email }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_TIME
});

module.exports.verifyRefreshToken = async (token) => 
    await promisifyJWTVerify(token, REFRESH_SECRET);