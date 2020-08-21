var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var books=require('./books');

var userSchema = new Schema({

    admin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        default: '',
    
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false

    },
    gender: {
        type: String,
        default: "not set"
    },
    bookcount: {
        type: Number,
        default: 0


    },
    softcopycount: {
        type: Number,
        default: 0
    },
    hardcopycount: {
        type: Number,
        default: 0

    },
    profileurl: {
        type: String,
        default: 'nodp.jpg'
    },
    isVerified:{
            type:Boolean,
            default:false
    },
    bookCollection: [
        {
            type:Schema.Types.ObjectId,
            ref:'books' 
        }
     ]
});
var users = mongoose.model('user', userSchema);
module.exports = users;