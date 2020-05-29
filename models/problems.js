var mongoose = require('mongoose');
var Schema = mongoose.Schema;






var problemSchema = new Schema({


    desc: {
        type: String,
        required: true
    },

    userEmail: {
        type: String,
        required: true,

    },

});
var problems = mongoose.model('problem', problemSchema);
module.exports = problems;