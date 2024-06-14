const bcrypt = require('bcryptjs');
const CONSTANTS = require('../configs/constants')

module.exports.hashPass = async (req, res, next) => {
    try {
        const { body, body: { password } } = req;
        req.passwordHash = await bcrypt.hash(password, CONSTANTS.SALT_ROUNDS)

        delete body.password;
        next();
    } catch (error) {
        next(error);
    }
}
/*

BCRYPT

Основні переваги bcrypt

1. Рівень безпеки: використовуються солі та раунди.
2. Повільність  
3. Налаштування

Сіль - це додаткові, унікальні дані, які додаються до паролю
Ітерація - багаторазове хешування
1 ітерація = 1 раунд

*/


