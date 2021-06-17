const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require ("passport-local-mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        //validator 
        required: [true, 'name field is required'],
    },
    password: {
        type: String,
    },
    password2: {
        type: String,
    }


})
UserSchema.plugin(passportLocalMongoose);

UserSchema.methods.authenticate = function(password) {      
    return this.password === password;

}
module.exports = mongoose.model('User', UserSchema);