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
        
        socket.on('location', (locationData) => {
            const {x, y, z} = locationData;
            console.log(`Received location (${x}, ${y}, ${z}) `);
        });

        socket.on('box', (boxData) => {
            console.log(boxData);
            socket.broadcast.emit('box', boxData);
        });

        socket.on('command', data => {
            console.log('Received data: ', data);
            socket.broadcast.emit('webserver_ros', data);
        });
        
        socket.on('location', locationStatus => {
            // Send to the client
            socket.broadcast.emit('location', locationStatus);
        });

        socket.on('status', (statusData) => {
            const {status, data} = statusData; // {status: 'storage', data: 'retrieved'}
            switch (status) {
                case 'dispatch':
                    // Emit this to the ROS
                    socket.broadcast.emit('destination', data);
                    break;
                default:
                    console.log('Not available yet!');
                    break;
            }
        });

        // Message from ROS
        socket.on('ros', data => {
            console.log('Received: ', data);
            socket.broadcast.emit('eyePos', data);
        });

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected`);
        });

    });
    return httpServer;
}

module.exports = ioSocket;
