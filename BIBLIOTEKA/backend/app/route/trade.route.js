module.exports = (app) => {

    const trade = require('../controller/trade.controller');

    var { authJwt } = require("../middleware");
    
    app.post('/api/request', [authJwt.verifyToken], trade.requestTrade);
    app.get('/api/usertrade',[authJwt.verifyToken], trade.getTradesForUser);
    app.get('/api/usertrade2',[authJwt.verifyToken], trade.getTradesForUser2);
    app.delete('/api/trade/:id',[authJwt.verifyToken], trade.deleteTrade);
    app.post('/api/trade/status', [authJwt.verifyToken], trade.updateTradeStatus);
};