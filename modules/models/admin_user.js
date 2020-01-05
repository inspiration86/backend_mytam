const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');
let access=[true,true,true,true,true,true];
const AdminUserSchema = new Schema({
    name : { type : String } ,
    profile : { type : String } ,
    mobail : { type : String } ,
    tell : { type : String } ,
    postalCode : { type : String } ,
    address : { type : String } ,
    city: { type : String } ,
    country: { type : String } ,
    role: { type : String,required:true,unique:true } ,
    email : { type : String , required : true , unique : true} ,
    password : { type : String , required : true} ,
    type : { type : String ,default:'admin'},
    access_level:{type:Array,required:true,default:access}
});
AdminUserSchema.plugin(timestamps);
AdminUserSchema.plugin(mongoosePaginate);
AdminUserSchema.pre('save' , function(next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})
module.exports = mongoose.model('admin_user' , AdminUserSchema);