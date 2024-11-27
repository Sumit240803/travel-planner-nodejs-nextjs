const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    email : {
        type : String ,
        required : true,
        unique : true,
        trim : true,
        match : [/.+@.+\..+/ , "Please enter a valid email"]
    },
    password : {
        type : String , 
        required : true,
        minlength : 6
    },
    role : {
        type : String,
        enum : [
                "user",
                "admin"
        ],
        default : "user"
    },
    createdAt : {
        type : Date,
        default : Date.now
    },

}, {
    timeStamps : true,
})
userSchema.pre("save" ,async function (next){
    if(!this.isModified("password")) return next();
    this.password =await bcrypt.hash(this.password , 10);
    next();
})
const User = mongoose.model("User" , userSchema);
module.exports = User;