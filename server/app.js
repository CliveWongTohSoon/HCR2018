const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();

// const http = require('http').Server(app);
// const io = require('socket.io')(http);
const socketIO = require('./sockets');

const router = express.Router();
const url = process.env.MONGODB_URI || "mongodb://localhost";

const port = 5000 || process.env.PORT;

routes(router);

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use('/api', router);

const http = socketIO(app);
// const httpServer = http.Server(app);
// const io = ioSocketServer(httpServer);

// io.on('connection', (socket) => {
//     console.log(`User ${socket.id} connected`);
    
//     socket.on('location', (locationData) => {
//         const {x, y, z} = locationData;
//         console.log(`Received location (${x}, ${y}, ${z}) `);
//     });

//     socket.on('status', (statusData) => {
//         // console.log(statusData);
//         const {status, data} = statusData;
//         console.log(status, data);
//         switch (status) {
//             case 'dispatch':
//                 console.log('Dispatching to location...', data);
//                 io.sockets.emit('location', data);
//                 break;
//             default:
//                 console.log('Not available yet!');
//                 break;
//         }
//     });

//     socket.on('disconnect', () => {
//         console.log(`User ${socket.id} disconnected`);
//     });

// });

http.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});
