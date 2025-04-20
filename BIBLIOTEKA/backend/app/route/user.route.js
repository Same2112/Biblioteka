module.exports = (app) => {
    const user = require('../controller/user.controller');
    var { authJwt } = require("../middleware");

    app.get('/api/count/user', [authJwt.verifyToken], user.getUserCount);
};
