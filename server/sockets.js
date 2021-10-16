const { userGetOnlineOffline, getUsuarios, savePersonalMessage } = require("../controllers/sockets");
const { validateJWT } = require("../helpers/generateJWT");


class Sockets{

    constructor(io) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents(){
        this.io.on('connection',async(socket)=>{

            const [valid, uid]=validateJWT(socket.handshake.query['x-token']);

            if(!valid){
                console.log("Cliente No valid");
                return socket.disconnect();
            }

            await userGetOnlineOffline(uid);
            
            const usuarios = await getUsuarios();
            this.io.emit('lista-usuarios',usuarios);

            socket.join(uid);

            socket.on('personal-message',async(payload)=>{
                const resp = await savePersonalMessage(payload);
                this.io.to(payload.para).emit('personal-message',resp);
                this.io.to(payload.de).emit('personal-message',resp);
            });


            socket.on('disconnect',async()=>{
                await userGetOnlineOffline(uid,false);
                const usuarios = await getUsuarios(); 
                this.io.emit('lista-usuarios',usuarios);
            })


        });
    }

}

module.exports = Sockets;