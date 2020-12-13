const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const reportSchema = new Schema({
    user_id:String,
    report_date: String,
    income: Number,
    possible: Number,
    allOrders:[
        {order_id:String, order_date:String}]
})

const Report = mongosee.model('Report', reportSchema);
module.exports =Report;