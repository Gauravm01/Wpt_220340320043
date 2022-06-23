
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());


const bodyParser = require('body-parser');


const mysql =require('mysql2');



app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not
let dbobj={
	host:'localhost',
	user:'root',
	password:'cdac',
	database:'exam',
	port:'3306'
}

const conn = mysql.createConnection(dbobj);

app.get("/getbookdetails",(req,resp)=>{
	console.log("getbook fun");
	let bookid = req.query.bookid;
	let output = {status:false,bookdetails:{bookid:0,bookname:"",price:0}}
	conn.query('select bookid,bookname,price from book where bookid =?',[bookid],(error,rows)=>{
		if(error){
			console.log(error);
		}else{
			if(rows.length>0){
				console.log("book found")
				output.status = true;
				output.bookdetails = rows[0];
			}else{
				console.log("book not found");
			}
		}
		console.log(output);
		console.send(output);
	});
});



app.get("/updateprice",(req,resp)=>{

	let bookid = req.query.bookid;
	let bookprice = req.query.bookprice;
	let output = false;


	conn.query('update book set price  =? where bookid = ?',[bookprice,bookid],(error,rows)=>{
		if(error){
			console.log(error);
		}else{
			if(res.affectedRows>0){
				console.log("book price updated")
				output.status = true;
			
			}else{
				console.log("book price not updated");
			}
		}
		resp.send(output);
	});
});


app.listen(500, function () {
    console.log("server listening at port 500...");
});