const express = require('express');
const path = require('path');
const student = require('./models/student')
const PDFDocument = require('pdfkit');
const fs = require('fs');

var info;

const app = express();
const portt = 5000;
// const jwt = require('jsonwebtoken');
const session = require('express-session');

//SESSION
app.use(session({

	// It holds the secret key for session
	// secret: 'Your_Secret_Key',
    secret: 'keyboard cat',  maxAge: 60000,
	// Forces the session to be saved
	// back to the session store
	resave: true,

	// Forces a session that is "uninitialized"
	// to be saved to the store
	saveUninitialized: true
}));

const admin_controller = require('./controllers/admin')
const student_controller = require('./controllers/student')
const verifier_controller = require('./controllers/verifier')
app.use('/admin', admin_controller);
app.use('/student', student_controller);
app.use('/verifier', verifier_controller);



//POST REQ
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }))


const mysql = require('mysql');
const { dir } = require('console');
//CREATE CONNECTION
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'mirzabaig',
    database : 'mydb'
  });

//CONNECT
db.connect((err, res)=>{
    if(err) throw err;
    else
    console.log("Database connected!!!!");
});

const port = process.env.PORT || 5000;
//EXPRESS RELATED STUFF
app.use('/static',express.static('static'));// for serving static files
app.use('/node_modules',express.static('node_modules'));// for serving static files
app.use('/build/contracts',express.static('build/contracts'));// for serving static files
app.use(express.urlencoded({ extended: true }));



// PUG RELATED STUFF
app.set('view engine', 'pug');// set template engine pug
app.set('views', path.join(__dirname, 'views'));// set views directory 
//DATABASE




// END POINTS 

app.get('/', (req, res)=>{
        res.sendFile(path.join(__dirname+'/views/index.html'));
});
// app.get('/', (req, res)=>{
//         res.sendFile(path.join(__dirname+'/views/main.html'));
// });

app.get('/logout', (req, res)=>{
    res.redirect('/');
})
app.get('/toUser', (req, res)=>{
    res.sendFile(path.join(__dirname+'/views/newReg.html'));
})
app.get('/toIssuer', (req, res)=>{
    res.sendFile(path.join(__dirname+'/views/index.html'));
})
app.get('/toStudent', (req, res)=>{
    res.sendFile(path.join(__dirname+'/views/indexStudent.html'));
})

app.get('/newAccUser', (req, res)=>{
    res.sendFile(path.join(__dirname+'/views/registerUser.html'))
})
app.get('/newAccIssuer', (req, res)=>{
    res.sendFile(path.join(__dirname+'/views/registerIssuer.html'))
})

app.post('/login1',(req, res)=>{
    data = req.body;
    const fpw = data.loginPassword;
    console.log(fpw);
    console.log(data);
    let query = `SELECT password from customer WHERE email like '${data.loginName}'`;
    const op = db.query(query,(err, result)=>{
        if(err){  throw err; } 
        else{
        console.log(result);
        if(result.length == 0){
            res.sendFile(path.join(__dirname+'/views/wrongPW.html'));
        }
        else{
        let key = Object.keys(result);
        let pw = result[key].password;
      
        console.log("Done!!!");
        if(pw==fpw){
        req.session.name = data.username;
        // res.sendFile(path.join(__dirname+'/views/main.html'));
        res.redirect('/admin/home');
        }
        else
        res.sendFile(path.join(__dirname+'/views/wrongPW.html'));
        }
        }
    });


    // res.sendFile(path.join(__dirname+'/views/main.html'));
})
app.post('/login2',(req, res)=>{

    data = req.body;
    const fpw = data.loginPassword;
    console.log(fpw);
    console.log(data);
    let query = `SELECT password from login_users WHERE email like '${data.loginName}'`;
    const op = db.query(query,(err, result)=>{
        if(err){  throw err; } 
        else{
        console.log(result);
        if(result.length == 0){
            res.sendFile(path.join(__dirname+'/views/wrongPW.html'));
        }
        else{
        let key = Object.keys(result);
        let pw = result[key].password;
      
        console.log("Done!!!");
        if(pw==fpw){
        req.session.name = data.username;
        // res.sendFile(path.join(__dirname+'/views/mainUser.html'));
        res.redirect('/verifier/home');
        }
        else
        res.sendFile(path.join(__dirname+'/views/wrongPW.html'));
        }
        }
    });

    // res.sendFile(path.join(__dirname+'/views/mainUser.html'));
    // res.sendFile(path.join(__dirname+'/views/main.html'));
})


app.post('/signup-user',(req, res)=>{

    console.log(req.body);
    let flag = true;
    data = req.body;
    let post = {email : data.email, password: data.password};
    let query = `insert into login_users set ?`;
    let q = db.query(query, post, (err, result)=>{
        if(err){
            flag = false;
            throw err;
        }
        else{
            console.log("done");
        }
    });
    // post = {username:data.email, password:data.password};
    // query = `insert into login set ?`;
    // q = db.query(query, post, (err, result)=>{
    //     if(err){
    //         flag = false; 
    //         throw err;
    //     }
    //     else{
    //         console.log("Done pass setting");
    //     }
    // });
    if(flag)
    res.redirect('/');
    else
    res.sendFile(path.join(__dirname+'/views/wrongPW.html'));

    // res.redirect('/');
})


app.post('/signup-issuer', (req, res)=>{
    console.log(req.body);
    let flag = true;
    data = req.body;
    let post = {email : data.email, password: data.password};
    let query = `insert into customer set ?`;
    let q = db.query(query, post, (err, result)=>{
        if(err){
            flag = false;
            throw err;
        }
        else{
            console.log("done");
        }
    });
    // post = {username:data.email, password:data.password};
    // query = `insert into login set ?`;
    // q = db.query(query, post, (err, result)=>{
    //     if(err){
    //         flag = false; 
    //         throw err;
    //     }
    //     else{
    //         console.log("Done pass setting");
    //     }
    // });
    if(flag)
    res.redirect('/');
    else
    res.sendFile(path.join(__dirname+'/views/wrongPW.html'));

})



app.get('/test', (req, res)=>{
    // res.sendFile(path.join(__dirname+'/views/indexQ.html'));
    res.redirect('/admin/test')
})

app.get('/Taketest', (req, res)=>{
    // res.sendFile(path.join(__dirname+'/views/indexA.html'));
    res.redirect('/student/test')
})



app.post('/getReport', (req, res) => {
  const data = req.body;
  
  let query = `SELECT * from student WHERE roll_no like '${data.roll_no[0]}'`;

  const op = db.query(query,(err, result)=>{
      if(err){  throw err; } 
      else{
     
  info = result[0];
  console.log("in thhe app.js");
  console.log(info);
  const doc = new PDFDocument({userPassword: "Mirza"});//{userPassword: "Mirza"}
  const invoiceId = 1001;
  
  var clgName = "       B V Raju Institute Of Technology";
  var clgAdj = "        UGC autonomous, NBA and NAAC accredited"
  var clgAdd = "        Vishnupur, Narsapur, Medak(DIST), Telangana, 502313."

  // send the PDF document as a response
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=invoice-${data.roll_no[0]}.pdf`);

    doc.pipe(res);
//   doc.pipe(fs.createWriteStream('output.pdf'));
    const stream = doc.pipe(fs.createWriteStream('output.pdf'));
  // create a document and pipe to a blob

    // draw some text
    // doc.rect(0, 0, doc.page.width, doc.page.height).stroke('red');
    doc.rect(doc.page.margins.left-20, doc.page.margins.top-25, doc.page.width - doc.page.margins.left - doc.page.margins.right+40, doc.page.height - doc.page.margins.top - doc.page.margins.bottom+40).stroke('black');

    doc.image(path.join(__dirname+'/static/img/clg.jpeg'), 60, 50, {width: 100})
    doc.fontSize(25).text(clgName, {align: 'center'})
    doc.fontSize(15).text(clgAdj,{align: 'center'})
    doc.fontSize(13).text(clgAdd,{align: 'center'})
    // doc.fontSize(25).text('Here is some vector graphics...', 100, 80);

    doc.rect(doc.page.margins.left-20, doc.page.margins.top+80, doc.page.width - doc.page.margins.left - doc.page.margins.right+40, 2).stroke('black');

    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    var name = "Name: "+info.name;
    var roll_no = "Roll No. : "+info.roll_no;
    var dept = "Department : "+info.dept;
    var year = "Year : "+info.year;
    var sem = "Semister : 2";
    var email = "Email : "+info.email;
    var ph = "Mobile No. : "+info.ph_no;
    var gender = "Gender : "+info.gender;
    var dob = "Date Of Birth : "+info.dob.getDate().toString()+"-"+info.dob.getMonth().toString()+"-"+info.dob.getFullYear().toString();
    var sp = "                              ";
    doc.fontSize(10).text(name+sp+sp+roll_no);
    doc.moveDown();
    doc.fontSize(10).text(dept);
    doc.moveDown();

    doc.fontSize(10).text(year+sp+sem);
    doc.moveDown();

    doc.fontSize(10).text(gender+sp+dob+sp+ph);
    doc.moveDown();

    doc.fontSize(10).text(email);
    
    doc.moveDown();
    doc.moveDown();

    var text = "This certificate is presented to [Name of the person] in recognition of their successful completion of the [Name of the course] course offered by [Name of the organization/institution]. [Name of the person] has demonstrated exceptional skills, knowledge and understanding of the course material and has successfully passed the test."

    doc.fontSize(10).text(text);

    doc.moveDown();
    doc.moveDown();
    doc.moveDown();

    var code = "a123";
    var cname = "Blockchain";
    var arr = data.roll_no[1].split(".");
    console.log(arr);
    var score = parseInt(arr[0])+" out of "+arr[1];
    var percentage = Number((((parseFloat(arr[0])/parseFloat(arr[1]))*100)).toFixed(2));+"%";

    doc.fontSize(10).text("Exam Code"+"                   "+"Couse Name"+sp+"Score"+sp+"Percentage");
    doc.moveDown()
    doc.moveDown()
    doc.fontSize(10).text(code+sp+cname+sp+"    "+score+sp+ percentage);

    doc.rect(doc.page.margins.left-20, doc.page.margins.top+305, doc.page.width - doc.page.margins.left - doc.page.margins.right+40, 1).stroke('black');
    doc.rect(doc.page.margins.left-20, doc.page.margins.top+335, doc.page.width - doc.page.margins.left - doc.page.margins.right+40, 1).stroke('black');
    doc.rect(doc.page.margins.left-20, doc.page.margins.top+365, doc.page.width - doc.page.margins.left - doc.page.margins.right+40, 1).stroke('black');


  doc.end();

  // Pipe the PDF to the response
//   stream.on('finish', () => {
//     const file = fs.createReadStream('output.pdf');
//     file.pipe(res);

//     // Store the PDF in the local storage
//     const blob = new Blob([file], { type: 'application/pdf' });
//     const url = URL.createObjectURL(blob);
//     localStorage.setItem('pdf', url);
//   });

  res.send("ok");
}//else of the query
});//call back

}); 


// SERVER 
app.listen(portt, ()=>{
    console.log(`Server running on:${portt}`);
});