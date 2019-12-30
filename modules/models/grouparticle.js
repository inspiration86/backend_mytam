const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupArticleSchema = new Schema({
    group_name : { type : String , required : true}
});

module.exports = mongoose.model('grouparticle' , GroupArticleSchema);