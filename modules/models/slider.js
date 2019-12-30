const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SliderSchema = new Schema({
    image : { type : String , required : true},
    title : { type : String , required : true},
    text : { type : String , required : true},
    link : { type : String },
    keyword : { type : String }
});
module.exports = mongoose.model('Slider' , SliderSchema);