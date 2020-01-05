const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BuySchema = new Schema({
    product_Id : { type : String , required : true},
    user_id:{ type : String , required : true},

});

module.exports = mongoose.model('Buy' , BuySchema);