var express = require('express')
var bodyParser = require('body-parser') //buat kita bisa menerima data front end 
var cors = require('cors') 
const mysql = require('mysql')
var app = express();
var port = 2001

const db = mysql.createConnection({
    host:'localhost',
    user:'jamal',
    password:'jamaludin',
    database:'popokpedia',
})

app.use(bodyParser.json())
app.use(cors())

app.get('/brand' , (req,res) => {
    var sql = 'select * from brand'
    db.query(sql, (err,result)=> {
        if(err) throw err;
        res.send(result)
    })
})

app.post('/addBrand' , (req,res) => {
    var newBrand = {
        nama : req.body.nama   
    }
    var sql = 'insert into product set ? ;'
    db.query(sql,newBrand, (err, result) => {
        if(err) throw err;
    })
})



app.listen(port , () => console.log('API sedang Jalan di Port ' + port) )
