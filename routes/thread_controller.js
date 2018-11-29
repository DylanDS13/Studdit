const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const Thread = require('../models/Thread');
const User = require('../models/User');

router.post('/', function (req, res){
    User.findOne({username: req.body.username}, function (err, user){
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        Thread.create({
                title: req.body.title,
                content: req.body.content,
                user: user._id
            },
            function (err, thread){
                if (err) return res.status(500).send("There was a problem adding the information to the database.");
                res.status(200).send(thread);
            })
    })
});

router.put('/', function (req, res){

});

module.exports = router;