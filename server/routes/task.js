const Router = require('express');
const TaskController = require('../controllers/task.controller');
const {checkToken} = require('../middlewares/checkToken')

const taskRouter = Router();

// POST http://localhost:5000/api/tasks/
taskRouter.post('/', checkToken, TaskController.createUserTask);

// GET http://localhost:5000/api/tasks/

taskRouter.get('/', checkToken, TaskController.getAllUserTask);

// DELETE http://localhost:5000/api/tasks/:taskId

taskRouter.delete('/:taskId', checkToken, TaskController.deleteTask);

module.exports = taskRouter;

