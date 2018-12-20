# Instruction
The server uses typical MVC model. However, since the robot mostly deals with real-time communication, websocket is used mostly with the help of `socket.io`. The logic is mostly contained in `sockets/index.js`. Also, `express.js`, `cors` and `helmet` are used to help with the development. Database is not connected, as it wasn't needed for the demo purpose, however, it is needed when authentication service is built. The directory `routes` contain the api path, and the logic is in the directory `controllers`. There is only `/api/hello` to test whether the server is running. 

To install all dependencies, do:
```
$ npm ci
```

## Running
To serve the server, do:
```
$ npm start
```
