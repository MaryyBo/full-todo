const Router = require ('express');
const userRouter = require('./user');
const router = Router();

// http://localhost:5000/api/users
router.use('/users', userRouter);

module.exports = router;