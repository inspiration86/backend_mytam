const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const ProductSchema = new Schema({
    name : { type : String , required : true},
    code : { type : String , required : true,unique:true},
    price : { type : String },
    price_garranty :{ type : String },
    use : {type :String,required:true},
    number : { type :Number,required:true},
    keyword : {type:String},
    alt_img : {type:String},
    description : {type:String,required:true},
    image : {type:String,required:true},
    exist : {type:Boolean,required:true,default:true},
    active:{type:Boolean,default:false,required:true}
});
ProductSchema.plugin(timestamps);
module.exports = mongoose.model('Product' , ProductSchema);
