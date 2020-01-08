const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const OfferSchema = new Schema({
    product_Id : { type : String , required : true,unique:true},
    offer_code : { type : String , required : true,unicode:true},
    offer_type : { type : String , required : true},
    start_date : { type : String , required : true},
    end_date : { type : String , required : true},
    percent_offer : { type : Number , required : true},
    max_number : { type : Number,required:true },
    remain_number : { type : Number },
    active : { type : String , required : true,default:false}
});
OfferSchema.plugin(timestamps);
module.exports = mongoose.model('Offer' , OfferSchema);