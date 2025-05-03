const mongoose = require('mongoose')


const userSchema = {
    name:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    }
}
const userModel = mongoose.model('imcauser',userSchema)

module.exports=userModel