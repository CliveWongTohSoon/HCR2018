const http = require('http');
const ioSocketServer = require('socket.io');

const ioSocket = (app) => {
    const httpServer = http.Server(app);
    const io = ioSocketServer(httpServer, {
        log: false,
        agent: false,
        origins: '*:*',
        transports: ['websocket', 'htmlfile', 'xhr-polling', 'json-polling', 'polling']
    });
    
    io.on('connection', (socket) => {
        console.log(`User ${socket.id} connected`);
        
        socket.on('image', data => {
            socket.broadcast.emit('image', data);
        });

        // Message from raspberry pi 
        socket.on('box', (boxData) => {
            console.log(boxData);
            socket.broadcast.emit('box', boxData);
        });

        // Message from client to ROS
        socket.on('command', command => {
            /****************************
             * command takes the form of
             * {type, data}
             ****************************/
            console.log('Received data: ', command);
            // Data from client, send to ros
            socket.broadcast.emit('webserver_ros', command);
        });

        // Message from ROS
        socket.on('ros', message => {
            console.log('Received: ', message);
            const {type, content} = message
            switch(type){
                case 'facial_recognition':
                    socket.broadcast.emit('eyePos', content);
                    break;
                case 'status':
                    socket.broadcast.emit('location', content);
                    break;
                default:
                    console.log('Unknown type', content);
                    break;
            }
        });

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected`);
        });

    });
    return httpServer;
}

module.exports = ioSocket;
