const Usuario = require('../Db/models/usuarios');
const bcrypt = require('bcryptjs');
const {generateJWT} = require('../helpers/generateJWT');


const createUser = async(req,res)=>{

    
    try {
        const {email,password} = req.body;

        const existeEmail = Usuario.findOne({email});

        console.log(existeEmail);


       if(!existeEmail){
            throw Error("Duplicated Email");
        }

        const usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);

        await usuario.save();
    
        res.json({ok:true,msg:'user-created',usuario});
    } catch (error) {

        res.status(500).json({
            ok:false,
            error:"error creating user"
        });
        
    }
    
    

}

const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;

        const user = await Usuario.findOne({email});

       if(!user){
            throw Error("No email Found");
        }

        const checkPassword = bcrypt.compareSync(password,user["password"])

        if(checkPassword){

            const token = await generateJWT(user["id"]);
            res.json({ok:true,msg:'user-logged',user,token});

        }else{
            throw Error("No right password"); 
        }
    
    } catch (error) {

        res.status(500).json({
            ok:false,
            error:"error Login"
        });
        
    }
}

const renewToken = async(req,res)=>{
    try {
        const {uid} = req;

        const user = await Usuario.findOne({_id:uid});

       if(!user){
            throw Error("No email Found");
        }

        const token = await generateJWT(user["id"]);
        res.json({ok:true,msg:'token-renewed',user,token});
    
    } catch (error) {

        res.status(500).json({
            ok:false,
            error:"error renew"
        });
        
    }
}



module.exports={createUser,loginUser,renewToken}