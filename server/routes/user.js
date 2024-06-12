const Router = require('express');
const UserController = require('../controllers/user.controller')

const userRouter = Router();

// POST http://localhost:5000/api/users/sign-up
userRouter.post('/sign-up', UserController.registrationUser )

// POST http://localhost:5000/api/user/sign-in
userRouter.post('/sign-in', UserController.loginUser)

module.exports = userRouter;