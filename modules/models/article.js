const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const ArticleSchema = new Schema({
    title : { type : String , required : true},
    abstract : { type : String , required : true},
    keyword : { type : String },
    key_title : { type : String },
    active : { type : Boolean ,default:false},
    author : { type : String , required : true},
    image : { type :String,required:true},
    alt_img:{type:String},
    detail : { type :String,required:true}
});
ArticleSchema.plugin(timestamps);
ArticleSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Article' , ArticleSchema);