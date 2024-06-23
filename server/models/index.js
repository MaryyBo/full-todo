const mongoose = require('mongoose');
const { DB } = require('../configs/db');
const User = require('./User');
const Task = require('./Task');
const RefreshToken = require('./RefreshToken');



mongoose.connect(DB)
    .catch(err => {
        console.log(`Connect failed: ${err.message}`);
    });


// АБО 

/*
async function start() {
await mongoose.connect(DB)
.catch(err => {
    console.log(`Connect failed: ${err.message}`);
});
}

start();
*/

module.exports = {
    User, Task, RefreshToken
}