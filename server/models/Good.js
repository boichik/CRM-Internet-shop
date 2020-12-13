const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const goodSchema = new Schema({
    good_id:Number,
    user_id:String,
    manufacturer:String,
    name: String,
    price:Number,
    article:String,
    count:Number
})

const Good = mongosee.model('Good', goodSchema);
module.exports =Good;