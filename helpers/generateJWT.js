const jwt    = require('jsonwebtoken');
const moment = require('moment');

const generateJWT=(uid)=>{

    return new Promise((res,rej)=>{

        const payload={
            uid:uid,
            createdAt: moment().unix(),
            expiredAt: moment().add(5,'minutes').unix()  
        }

        jwt.sign(payload,process.env.JWT_KEY,{
            expiresIn:'5h'
        },(err,token)=>{
            if(err){
                rej(false);
            }else{
                res(token);
            }
        });

    });



}

const validateJWT=(token='')=>{
    try {
        const {uid} = jwt.verify(token,process.env.JWT_KEY);

        return [true, uid];
        
    } catch (error) {
        return [false, null];
    }
}

module.exports = {generateJWT,validateJWT};