const user = require('./user');

const routerHelper = (router) => {
    user(router);
}

module.exports = routerHelper;
