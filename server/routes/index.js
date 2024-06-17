const Router = require('express');
const userRouter = require('./user');
const router = Router();
const taskRouter = require('./task')

// http://localhost:5000/api/users
router.use('/users', userRouter);

// http://localhost:5000/api/tasks
router.use('/tasks', taskRouter);

module.exports = router;