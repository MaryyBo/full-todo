const { Task } = require('../models');

module.exports.getAllUserTask = async (req, res, next) => {
    try {
        const { tokenPayload: { userId } } = req;
        const userTasks = await Task.find({// умова по якій шукати
            authorId: userId
        })

        return res.status(200).send({ data: userTasks })

    } catch (error) {
        next(error);
    }
}

module.exports.createUserTask = async (req, res, next) => {
    try {

        const { body, tokenPayload: {userId} } = req;
        const task = await Task.create({...body, authorId: userId});

        return res.status(200).send({ data: task })

    } catch (error) {
        next(error);
    }
}