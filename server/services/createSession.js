const { promisify } = require('util')
const jwt = require('jsonwebtoken');

const promisifyJWTSign = promisify(jwt.sign);
const promisifyJWTVerify = promisify(jwt.verify);

// const payload = {
//     userId,
//     email
//     //тут можна зберігати - геолокація, роль користувача, відбиток пальця, ip адреса, інфо про пристрій, операційну систему
// };

const EXPIRES_TIME = "1h"; // або кількість секунд (наприклад 60*60 = 3600)

const secret = 'Euro-2024';

// const createdToken = promisifyJWTSign(payload,secret, {
//     expiresIn: EXPIRES_TIME
// })

module.exports.createToken = async({ userId, email }) => await promisifyJWTSign({ userId, email }, secret, {
    expiresIn: EXPIRES_TIME
});

module.exports.verifyToken = async (token) => await promisifyJWTVerify(token, secret);


