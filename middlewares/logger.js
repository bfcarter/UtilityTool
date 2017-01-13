var debugCtrl = require("../controllers/debugger.js");

module.exports = function(req, res, next) {
    var ip = req.ip;
    var realUrl = req.originalUrl;

    debugCtrl.debug("normal", "ip: " + ip + " sent an request to url: " + realUrl);

    next();
};
