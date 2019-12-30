const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VideoSchema = new Schema({
    video : { type : String , required : true},
    title : { type : String , required : true},
    keyword : { type : String }
});
module.exports = mongoose.model('Video' , VideoSchema);