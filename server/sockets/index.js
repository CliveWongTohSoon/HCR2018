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
    
    // io.set("origins", "http://http://ec2-52-56-71-140.eu-west-2.compute.amazonaws.com:8080/");
    io.on('connection', (socket) => {
        console.log(`User ${socket.id} connected`);
        
        socket.on('location', (locationData) => {
            const {x, y, z} = locationData;
            console.log(`Received location (${x}, ${y}, ${z}) `);
        });

        socket.on('box', boxData => {
            console.log(boxData);
        });

        socket.on('command', data => {
            console.log('Received data: ', data);
            socket.broadcast.emit('webserver_ros', data);
        });

        // setInterval(() => {
        //     socket.emit('webserver_ros', {'key': 'w'});
        // }, 1000);

        socket.on('status', (statusData) => {
            const {status, data} = statusData; // {status: 'storage', data: 'retrieved'}
            console.log(statusData);
            switch (status) {
                case 'dispatch':
                    socket.emit('location', data);
                    break;
                case 'storage':
                    console.log(data);
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
