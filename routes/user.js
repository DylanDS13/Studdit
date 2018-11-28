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

module.exports = router;