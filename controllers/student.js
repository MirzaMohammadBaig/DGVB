const express = require('express')
const router = express.Router()
const path = require('path');
const student = require('../models/student')
//POST REQ
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded());
// in latest body-parser use like below.
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/test',  function(req, res) {
    res.sendFile(path.join(__dirname, '../views', './student/indexA.html'));
});

router.get('/new', function(req, res) {
    res.sendFile(path.join(__dirname, '../views', './student/form.html'));
});

router.post('/reg', (req,res)=>{
    // var temp = {
    //     roll_no: '19211a05g2',
    //     password : 'xyz'
    // }
    // console.log(student.auth(temp));
    console.log(req.body);
    if(student.insertData(req.body))
    res.redirect('/');
    else
    res.send("not ok")
}) 


module.exports = router;
