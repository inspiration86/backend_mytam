const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProjectUsSchema = new Schema({
    image : { type : String , required : true},
    title : { type : String , required : true},
    feature : { type : Array },
    keyword : { type : String }
});
module.exports = mongoose.model('Projectus' , ProjectUsSchema);