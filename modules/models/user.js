const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');

const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    name : { type : String } ,
    profile:{ type : String } ,
    mobail : { type : String } ,
    tell : { type : String } ,
    postalCode : { type : String } ,
    address : { type : String } ,
    city: { type : String } ,
    country: { type : String },
    email : { type : String , required : true , unique : true} ,
    password : { type : String , required : true} ,
    type : { type : String ,default:'user'}
});
UserSchema.plugin(timestamps);
UserSchema.plugin(mongoosePaginate);

UserSchema.pre('save' , function(next) {
    
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})
module.exports = mongoose.model('User' , UserSchema);