const Router = require('express');
const UserController = require('../controllers/user.controller');
const { hashPass } = require('../middlewares/hashPassword');
const { checkToken } = require('../middlewares/checkToken');

const TokenController = require('../controllers/token_controller');


const userRouter = Router();

// POST http://localhost:5000/api/users/sign-up
userRouter.post('/sign-up', hashPass, UserController.registrationUser)

// POST http://localhost:5000/api/users/sign-in
userRouter.post('/sign-in', UserController.loginUser)

// GET http://localhost:5000/api/users/
userRouter.get('/', checkToken, UserController.checkAuth)

// POST http://localhost:5000/api/users/refresh
userRouter.post('/refresh', UserController.refreshSession)


userRouter.get('/test', TokenController.deleteExpiredRefreshTokens)

module.exports = userRouter;