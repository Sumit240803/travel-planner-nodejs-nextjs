const express = require("express");
const cors = require("cors");
const app = express();
const User = require("./models/User")
const bcrypt = require("bcrypt")
const createToken = require("./utils/jwt");
const authenticate = require("./utils/authenticateToken");
app.use(express.json());
app.use(cors());

app.get("/" , (req,res)=>{
    res.send("API is running");
})

app.post("/register" , async(req,res)=>{
    const {username , email , password  } = req.body;
    const newUser = new User({username , email , password});
    const user = await newUser.save();
    res.status(201).json({message :  "User created" ,user :  user});
})
app.post("/login" , async(req,res)=>{
    const {username , password} = req.body;
    const user =await User.findOne({username : username});
    if(user){
        const storedPw = user.password;
       // console.log(storedPw);
        const match = await bcrypt.compare(password , storedPw);
        if(match){
            const token = createToken(username , user.role);
            res.status(201).json({message : "login success" , token : token});
        }else{
            res.status(500).json({message : "login no success"})
        }
    }

})
app.get("/protected" , authenticate , (req,res)=>{
    res.status(201).json({message : "You can access this route"});
})
module.exports = app;