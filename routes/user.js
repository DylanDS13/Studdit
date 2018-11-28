const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const User = require('../models/User');

router.post('/', function (req, res){
    User.create({
        username: req.body.username,
        password: req.body.password
        },
        function (err, user ) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        })
});

router.put('/', function (req, res){
    User.findOne({username: req.body.username})
        .then((user) => {
            if(user.password === req.body.oldPassword){
                user.update({password: req.body.newPassword}, function (err, raw){
                    if (err) return res.status(500).send("Something wrong when deleting data!");

                    res.status(200).send(raw);
                })
            }
            else {
                res.status(401).send("Wrong password");
            }
        })
});

router.delete('/', function (req, res){
    User.findOne({username: req.body.username})
        .then((user) => {
            if(user.password === req.body.password){
                user.remove(function (err, doc){
                    if (err) return res.status(500).send("Something wrong when deleting data!");

                    res.status(200).send(doc);
                })
            } else {
                res.status(401).send("Wrong password");
            }
        })
});

module.exports = router;