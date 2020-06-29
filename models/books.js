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
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }

});
var books=mongoose.model('books',bookSchema)
module.exports=books;