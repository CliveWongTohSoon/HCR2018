let userController = require('../controllers/user.ctrl');
let multipart = require('connect-multiparty');

const multipartWare = multipart();

const routerHelper = (router) => {
    router
        .route('/hello')
        .get(userController.sayHello);
};

module.exports = routerHelper;
