const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BuySchema = new Schema({
    product_id : { type : String , required : true},
    user_id:{ type : String , required : true},
    number:{ type : Number , required : true},
    offer:{ type : Boolean , required : true,default:false},
    code_offer:{type:Number},
    warranty:{ type : Boolean , required : true,default:false},
    date:{ type : String , required : true},
    time:{ type : String , required : true},
    status:{ type : String ,required : true,default:'در حال بررسی'}
});
module.exports = mongoose.model('Buy' , BuySchema);