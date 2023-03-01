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
    console.log("Database connected!!!!");
});
var infop;
module.exports= {
    insertData: function(data){
        let flag = true;
       
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
    const flag = true;
    let query = `SELECT password from student WHERE roll_no like '${data.roll_no}'`;
    const op = db.query(query,(err, result)=>{
        if(err){  flag = false; throw err; } 
        else{
        console.log(result);
        if(result.length == 0){
            flag = false;
        }
        else{
        let key = Object.keys(result);
        let pw = result[key].password;
      
        console.log("Done!!!");
        if(pw==fpw){
        req.session.name = data.username;
        res.redirect('/verifier/home');
        }
        else flag = false;
        }
        }
    });

    return flag;
    }//auth

    

}//outer

