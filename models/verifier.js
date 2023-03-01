const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mirzabaig',
    database : 'mydb'
  });
  db.connect((err, res)=>{
    if(err) throw err;
    else
    console.log("Database connected!!!!");
});

module.exports= {
    insertData: function(data){
        let flag = true;
        let post = {
            roll_no : data.roll_no,
            password : data.password,
            name : data.name,
            dept : data.department,
            year : parseInt(data.year, 10),
            dob : data.dob,
            email : data.email,
            ph_no : data.mobile_number,
            gender : data.gender
        };
        let query = `insert into student set ?`;
        let q = db.query(query, post, (err, result)=>{
        if(err){
            flag = false;
            throw err;
        }
        else{
            console.log("done");
        }
        });
        return flag;

    }
}

