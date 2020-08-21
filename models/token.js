var mongoose=require('mongoose')
var Schema=mongoose.Schema;


var tokenSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    token:{
        type:String,
        required:true
    },
    careatedAt:{
        type:Date,
        default:Date.now,
        expires:43200
    }
})

var token=mongoose.model('token',tokenSchema)
module.exports=token