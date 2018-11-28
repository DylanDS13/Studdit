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
    User.findOneAndUpdate(
        {username: req.body.username,
        password: req.body.oldPassword},
        {$set:{password: req.body.newPassword}},
        {new: true},
        function (err, doc){
            if (err) return res.status(500).send("Something wrong when updating data!");

            res.status(200).send(doc);
        }
    )
});

router.delete('/', function (req, res){
    User.findOneAndDelete(
        {username: req.body.username,
        password: req.body.password},
        function (err, doc){
            if (err) return res.status(500).send("Something wrong when deleting data!");

            res.status(200).send(doc);
        }
    )
})

module.exports = router;