const jwt = require("jsonwebtoken");

const auth = (req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(token){
        try{
           const decoded = jwt.verify(token,"prits")
           if(decoded){
            req.body.userID = decoded.userID
            req.body.name = decoded.user
            console.log(decoded)
            next();
           }else{
            res.json({msg:"You are nor authorized"})
           }
        }catch(err){
            res.json({err});
        }
    }else{
        res.json({msg:"Please login"})
    }
}

module.exports = {
    auth
}