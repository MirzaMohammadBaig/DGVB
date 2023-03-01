const express = require('express')
const router = express.Router()
const path = require('path');

router.get('/home',  function(req, res) {
    res.sendFile(path.join(__dirname, '../views', './verifier/mainUser.html'));
});
router.get('/test', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', './student/indexA.html'));
});


module.exports = router;
