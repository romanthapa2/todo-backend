const jwt = require("jsonwebtoken");
const jwt_secret = "romanthapaand@";


// the use of middleware is to run the next 
// thing after this function
const fetchuser=(req,res,next)=>{
    // get token from the header of thunder client, verify it and get the user using auth-token
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using a valid user"})
    }
    try{
    const data =jwt.verify(token,jwt_secret);
    req.user=data.user;
    next();
    }catch(error){
        res.status(401).send({error:"please using a valid user"})
    }
}
module.exports=fetchuser;