const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CooperatorSchema = new Schema({
    image : { type : String , required : true,default:'user'} ,
    name : { type : String , required : true,default:'user'},
});
module.exports = mongoose.model('Cooperator' , CooperatorSchema);