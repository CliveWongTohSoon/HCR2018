const http = require('http');
const ioSocketServer = require('socket.io');

const ioSocket = (app) => {
    const httpServer = http.Server(app);
    const io = ioSocketServer(httpServer);
    
    io.on('connection', (socket) => {
        console.log(`User ${socket.id} connected`);
        
        socket.on('location', (locationData) => {
            const {x, y, z} = locationData;
            console.log(`Received location (${x}, ${y}, ${z}) `);
        });

        socket.on('status', (statusData) => {
            const {status, data} = statusData;
            console.log(statusData);
            switch (status) {
                case 'dispatch':
                    socket.emit('location', data);
                    break;
                default:
                    console.log('Not available yet!');
                    break;
            }
        });

        // Message from ROS
        socket.on('ros', data => {
            jsonData = JSON.parse(data);
            console.log('Received: ', jsonData);
            socket.broadcast.emit('eyePos', jsonData);
        });

        socket.on('disconnect', () => {
            console.log(`User ${socket.id} disconnected`);
        });

    });
    return httpServer;
}

module.exports = ioSocket;
