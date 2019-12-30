const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate=require('mongoose-paginate');
const ProductSchema = new Schema({
    name : { type : String , required : true},
    code : { type : String , required : true},
    price : { type : String },
    price_garranty :{ type : String },
    use : {type :String,required:true},
    number : { type :Number,required:true},
    keyword : {type:String},
    description : {type:String,required:true},
    image : {type:String},
    exist : {type:Boolean,required:true,default:true},
    active:{type:Boolean,default:false}
});
ProductSchema.plugin(timestamps);
ProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Product' , ProductSchema);
