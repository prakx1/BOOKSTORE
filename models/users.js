var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
        default: "not set"


    },
    desc: {
        type: String,
        default: "not set"
    },
    availableAs: {
        type: String, //either hardcopy or softcopy
        required: true
    },

    price: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        default: "not set"
    },
    imageurl: {
        type: String,
        default: 'nobook.png'

    },
    bookurl: {
        type: String,
        default: ''
    },
    softcopy_available: {
        type: Number,
        default: 0
    }







});





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

    bookCollection: [bookSchema]
});
var users = mongoose.model('user', userSchema);
module.exports = users;