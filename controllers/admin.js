const express = require('express')
const router = express.Router()
const path = require('path');

router.get('/home',  function(req, res) {
    console.log(req.session.name);
    res.sendFile(path.join(__dirname, '../views', './admin/main.html'));
});

router.get('/test', function(req, res) {
    console.log(req.session.name);
    res.sendFile(path.join(__dirname, '../views', './admin/indexQ.html'));
});

module.exports = router;
