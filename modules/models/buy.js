const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BuySchema = new Schema({
    group_name : { type : String , required : true}
});

module.exports = mongoose.model('Buy' , BuySchema);