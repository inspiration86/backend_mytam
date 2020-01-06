const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const StockSchema = new Schema({
    product_code : { type : String , required : true},
    number : { type : Number , required : true}
});
module.exports = mongoose.model('Stock' , StockSchema);