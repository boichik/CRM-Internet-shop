const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const orderSchema = new Schema({
    order_id:Number,
    user_id:String,
    costumer_id:String,
    order_date: Date,
    costs:Number,
    article_good:String,
    count:Number,
    status:[
        {status_now:String, changes_date:String, comnt:String}],    
    delivery:String,
    comment:String
})

const Order = mongosee.model('Order', orderSchema);
module.exports =Order;