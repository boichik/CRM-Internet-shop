const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const costumerSchema = new Schema({
    user_id:String,
    costumer_id:String,
    bio:String,
    phone:Number,
    email:String,
    orders:[{order_id:String, address:String, order_bio:String}]
})

const Costumer = mongosee.model('Costumer', costumerSchema);
module.exports =Costumer;