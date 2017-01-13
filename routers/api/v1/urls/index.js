var express = require("express");
var models = require("../../../../models/");
var getRandomText = require("../../../../controllers/getRandomText.js");
var debugCtrl = require("../../../../controllers/debugger.js");

var router = express.Router();

router.post("/", function (req, res) {
    var url = req.body.url;

    var randText = getRandomText(9);
    var shorturl = "/go/" + randText;

    models.shortUrl.create({
        id: randText,
        realUrl: url
    }).then(function () {
        res.json({
            message: "Your shortened url for " + url + " is " + shorturl,
            shortUrl: shorturl,
            error: false //false = no error
        });
    }).catch(function () {
        res.json({
            error: true//if true = error
        });
        debugCtrl.debug("error", "Error. Path: " + req.originalUrl + ". Failed to create a shorturl. Body: " + JSON.stringify(req.body));
    });
});

router.get("/", function (req, res) {
    models.shortUrl.findAll().then(function (shortUrls) {
        res.json({
            data: shortUrls,
            error: false///false = no error
        });
    }).catch(function () {
        res.json({
            error: true//if true = error
        });
        debugCtrl.debug("error", "Error. Path: " + req.originalUrl + ". Failed to find all shorturls.");
    });
});

router.get("/:id", function (req, res) {
    var id = req.params.id;

    models.shortUrl.findOne({
        where: { id: id }
    }).then(function (shortUrl) {
        res.json({
            data: shortUrl,
            error: false ///false = no error
        });
    }).catch(function () {
        res.json({
            error: true//if true = error
        });
        debugCtrl.debug("error", "Error. Path: " + req.originalUrl + ". Failed to find shorturl of id " + id + ".");
    });
});

router.post("/:id", function (req, res) {
    var id = req.params.id;
    var url = req.body.url;

    models.shortUrl.update({
        realUrl: url
    }, {
            where: {
                id: id
            }
        })
        .then(function () {
            res.json({
                error: false //false = no error
            });
        }).catch(function () {
            res.json({
                error: true//if true = error
            });
            debugCtrl.debug("error", "Error. Path: " + req.originalUrl + ". Failed to update shorturl's(of id " + id + ") url to " + url + ".");
        });
});

router.delete("/:id", function (req, res) {
    var id = req.params.id;

    models.shortUrl.findOne({
        where: { id: id }
    }).then(function (shortUrl) {
        if (!shortUrl) {
            res.json({
                error: true //if true = error
            });
            debugCtrl.debug("warning", "Warning. Path: " + req.originalUrl + ". Didn't find a shorturl of id " + id  + ". Failed to delete.");
            return;
        }

        shortUrl.destroy().then(function () {
            res.json({
                error: false  //false = no error
            });
        }).catch(function () {
            res.json({
                error: true  //if true = error
            });
            debugCtrl.debug("error", "Error. Path: " + req.originalUrl + ". Failed to delete a shorturl of id " + id + ".");
        });
    }).catch(function () {
        res.json({
            error: true//if true = error
        });
        debugCtrl.debug("error", "Error. Path: " + req.originalUrl + ". Failed to find a shorturl of id " + id + ".");
    });
});

module.exports = router;
