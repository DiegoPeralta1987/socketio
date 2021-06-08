const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
const Sockets = require('./socket');

class Server{


constructor(){
    this.app = express();
    this.port = process.env.PORT  || 80;

    //httpServer
    this.server = http.createServer(this.app);
 


    //configuracion socke
    this.io = socketio( this.server,{});
}
middlewares(){
    this.app.use( express.static(path.resolve(__dirname, '../Public')));
    
    ///cors
    this.app.use(cors());


}
configurarSocket(){
    new Sockets(this.io);
}
execute(){
    this.middlewares();
    this.configurarSocket();
    this.server.listen(this.port, ()=>{
        console.log('Server corriendo en el puerto: ', this.port);
    });
}
}
module.exports = Server;