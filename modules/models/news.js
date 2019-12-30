const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');
const NewsSchema = new Schema({
    title : { type : String , required : true},
    abstract : { type : String , required : true},
    detail : { type :String , required : true},
    keyword : { type :String},
    key_title : { type :String },
    active : { type :Boolean , default:false},
    image : { type : String , required : true},
    group_name: { type :String,required:true}
});
NewsSchema.plugin(timestamps);
NewsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('News' , NewsSchema);