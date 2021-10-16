const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors = require('cors');

const Sockets = require('./sockets');

const {dbConnection} = require('../Db/confifg');


class Server {

    constructor() {
        
        this.app  = express();

        this.port = process.env.PORT;

        dbConnection();
        
        this.server = http.createServer(this.app);

        this.io = socketio(this.server,{});
    }

    middlewares(){
        this.app.use(express.static(path.resolve(__dirname,'../public')));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use('/api/login',require('../router/auth'));
        this.app.use('/api/messages',require('../router/mesages'));
    }

    configSockets(){
        new Sockets(this.io);
    }

    execute(){
        this.middlewares();
        this.configSockets();
        this.server.listen(this.port,()=>{
            console.log("Server Running in Port",this.port);
        });
    }


}



module.exports = Server;