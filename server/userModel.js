const mongoose=require("mongoose");


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    }
})

const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;