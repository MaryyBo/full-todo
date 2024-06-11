const Router = require('express');
const UserController = require('../controllers/user.controller')

const userRouter = Router();

// POST http://localhost:5000/api/users/registration
userRouter.post('/registration', UserController.registrationUser )

// POST http://localhost:5000/api/user/login
userRouter.post('/login', UserController.loginUser)

module.exports = userRouter;