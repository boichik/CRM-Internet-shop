const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const goodSchema = new Schema({
    user_id:String,
    order_date: String,
    costs:Number,
    article_goods:String,
    count:Number,
    status:[
        {status_now:String, changes_date:String, comnt:String}],    
    delivery:String,
    comment:String
})

const Good = mongosee.model('Good', goodSchema);
module.exports =Good;