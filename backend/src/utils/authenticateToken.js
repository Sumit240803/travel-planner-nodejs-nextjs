const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.secretKey;

function authenticate(req,res,next){
    const token = req.header("Authorization")?.replace("Bearer ", '');
   // console.log(token);
    if(!token){
        res.status(500).json({message : "Login Again"});
    }

    jwt.verify(token , secretKey , (err)=>{
        if(err){
            return res.status(500).json({message : "Token expired"});
        }
        next();
    })
}

module.exports = authenticate;