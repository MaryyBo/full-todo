const mongoos = require('mongoose');

const { Schema } = mongoos;

/*
Task
- authorId
- body
- createdAt
- deadLine
- status
*/

const taskSchema = new Schema({
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    deadLine: {
        type: Date,
        required: true  //потрібна валідація що дедлайн більше ніж createdAt
    },
    status: {
        type: String,
        required: true
    }
});

const Task = mongoos.model('Task', taskSchema);

module.exports = Task;