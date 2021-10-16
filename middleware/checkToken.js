const jwt = require('jsonwebtoken');


const checkToken=(req,res,next)=>{

    const token = req.header('x-token');

    if(!token){
        return res.status(400).json({ok:false,msg:"token no recieved"});
    }

    try {
        const {uid,expiredAt} = jwt.verify(token,process.env.JWT_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(400).json({ok:false,msg:"token no valid"});
    }
}


module.exports = checkToken;