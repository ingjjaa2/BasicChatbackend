const Usuario = require('../Db/models/usuarios');
const Message = require('../Db/models/mensaje');

const userGetOnlineOffline = async(uid,newUserState=true)=>{

    const usuario = await Usuario.findById(uid);
    usuario.online = newUserState;
    await usuario.save();

    return usuario;

}

const getUsuarios = async()=>{

    const usuarios = await Usuario
                        .find()
                        .sort('-online');

   return usuarios;
}

const savePersonalMessage = async(message)=>{

    try {
        const _newMessage = new Message(message);
        await _newMessage.save(); 
        const _response ={
            de:_newMessage.de,
            para:_newMessage.para,
            message:_newMessage.message,
            createdAt:_newMessage.createdAt,
            updatedAt:_newMessage.updatedAt
        }
        return _response;
    } catch (error) {
        return null;
    }


}

module.exports={
    userGetOnlineOffline,
    getUsuarios,
    savePersonalMessage
}