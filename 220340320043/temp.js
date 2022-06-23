
let db = {
    host: 'localhost',
    user: 'root',
    password: 'cdac',
    database: 'exam',
    port: 3306
};

const mysql = require("mysql2");
const conn = mysql.createConnection(db);

const express = require('express');
const app = express();

app.listen(900, () => {
    console.log("Browser Listening");
});


app.use(express.static("abc"));

app.get('/getAllItems', (req, res) => {
    conn.query('select * from book', [],
        (err, rows) => {
            res.send(rows);
            console.log(rows);
        });
});

app.get('/getItems', (req, res) => {

    let input = req.query.bookid;
    let output = { status: false, itemdetails: { bookname: '', price: '' } };

    conn.query('select bookid, bookname,price from book where bookid=?', [input],
        (err, rows) => {
            console.log(rows);

            if (err) {
                console.log(err);
            } else {
                if (rows.length > 0) {
                    output.status = true;
                    output.itemdetails = rows[0];
                    console.log(output.itemdetails);
                }
            }
            res.send(output);
        });
});


app.get('/updateItems', (req, res) => {

    let input = { bookid: req.query.bookid, bookname: req.query.bookname, price: req.query.price,  };

    let output=false;

    conn.query('update book set price=?,bookname=? where bookid=?', [input.price,input.category,input.bookid],
        (err, rows) => {
            console.log(rows);

            if (err) {
                console.log(err);
            } else {
                if (rows.affectedRows > 0) {
                    output = true;
                }
            }
            res.send(output);
        });
});

app.get('/updateItems', (req, res) => {


    
});
