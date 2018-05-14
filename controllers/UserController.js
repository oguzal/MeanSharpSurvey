var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var User = require('../model/User');

router.post('/', async function (req, res) {
    try {
        var user = await User.create({
            userID: req.body.userID,
            timeZone: req.body.timeZone,
            joinDate: Date.now()
        });
    }
    catch (err) {
        if (err.code == 11000) return res.status(500).send("The user already exists in the system.");
        return res.status(500).send("There was a problem adding the user");
    }
    res.status(200).send(user);
});

router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});


router.get('/:userID', function (req, res) {
    User.find({ "userID": req.params.userID }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

router.delete('/:id', function (req, res) {
    //TODO add logic to respond if user not found
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User: " + user.name + " was deleted.");
    });
});

router.put('/:id', function (req, res) {
    //TODO add logic to respond if user not found
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});


module.exports = router;