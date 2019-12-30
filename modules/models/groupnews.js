const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupNewsSchema = new Schema({
    group_name : { type : String , required : true}
});

module.exports = mongoose.model('groupnews' , GroupNewsSchema);