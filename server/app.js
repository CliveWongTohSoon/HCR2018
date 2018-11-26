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

const port = process.env.PORT || 9000;

routes(router);

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());
app.use(helmet());
app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUTS, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', false);
    next();
});

app.use('/api', router);

// const http = socketIO(app);

const server = app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})

// http.listen(port, () => {
//     console.log(`Server started at port: ${port}`);
// });
