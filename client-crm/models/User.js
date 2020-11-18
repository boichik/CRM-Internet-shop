const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const userSchema = new Schema({
    name: String,
    email: {
        unique: true,
        type: String
    },
    password: String
})

const User = mongosee.model('User', userSchema);
module.exports =User;