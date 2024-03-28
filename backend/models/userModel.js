const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:{
        type:String,
       
    },
    email:{
        type: String ,
        require:[true,"Please enter the Email"]
    },
    password:{
        type : String ,
        required  : [ true ," Please enter the password" ]
    }
})

const UserModel=mongoose.model("user",userSchema)

module.exports={
    UserModel
}