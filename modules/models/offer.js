const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const OfferSchema = new Schema({
    product_Id : { type : String , required : true,unique:true},
    title : { type : String , required : true},
    offer_type : { type : String , required : true},
    offer_type : { type : String , required : true},
    start_date : { type : String , required : true},
    end_date : { type : String , required : true},
    percent_offer : { type : Number , required : true},
    max_count : { type : Number },
    max_count : { type : Number , default:0},
    active : { type : String , required : true,default:false}
});
OfferSchema.plugin(timestamps);
module.exports = mongoose.model('Offer' , OfferSchema);