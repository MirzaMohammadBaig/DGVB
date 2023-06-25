const express = require('express');
const { verify } = require('jsonwebtoken');
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
    console.log("Database connected!!!! student.js");
});
var infop;
module.exports= {
    insertData: function(data){
        let flag = true;
        console.log(data);
        post = {
            roll_no : data.roll_no,
            password : data.password,
            name : data.name,
            dept : data.department,
            year : parseInt(data.year),
            dob : data.dob,
            email : data.email,
            ph_no : data.mobile_number,
            gender : data.gender
        }
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

    },

    auth: function(data){
    const fpw = data.password;
    var flag = true;
    let query = `SELECT password from student WHERE roll_no like '${data.roll_no}'`;
    const op = db.query(query,(err, result)=>{
        if(err){  flag = false; throw err; } 
        else{
        console.log(result);
        if(result.length == 0){
            flag = false;
        }
        else{
        let pw = result[0].password;
      
        console.log(pw);
        if(pw==fpw){
        
        }
        else{ flag = false ; }
        }
        }
    });

    return flag;
    }//auth

    

}//outer

