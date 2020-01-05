const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProjectUsSchema = new Schema({
    image : { type : String , required : true},
    title : { type : String , required : true},
    feature : { type : Array ,required : true},
    keyword : { type : String },
    alt_img : { type : String }
});
module.exports = mongoose.model('Projectus' , ProjectUsSchema);