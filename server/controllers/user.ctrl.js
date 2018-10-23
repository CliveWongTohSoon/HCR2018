let User = require('../models/User');
let fs = require('fs');

module.exports = {
    sayHello: (req, res, next) => {
        res.send({ 
            response: 'Hello World!' 
        });
    }
}
