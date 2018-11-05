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
                    console.log(io.sockets.sockets);
                    break;
                default:
                    console.log('Not available yet!');
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
