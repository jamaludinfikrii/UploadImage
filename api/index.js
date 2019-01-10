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

app.post('/brand' , (req,res) => {
    var newBrand = {
        nama : req.body.nama   
    }
    var sql = 'insert into brand set ? ;'
    db.query(sql,newBrand, (err, result) => {
        if(err) throw err;
        res.send('Add Sukses')
    })
})

app.delete('/brand/:id' , (req,res)=>{
    var id = req.params.id
    var sql = `DELETE FROM brand WHERE id =${id}`
    db.query(sql, (err,result) => {
        if(err) throw err;
        // console.log(result)
        res.send('Delete Success')
    })
})

app.put('/brand' , (req,res)=> {
    var id = parseInt(req.body.id);
    var nama = req.body.nama;
    var sql = `update brand set nama = '${nama}' where id = ${id}`
    db.query(sql, (err,result)=>{
        if(err) throw err
        console.log(result)
        console.log('Ini Put yah gaess')
        res.send('Update Success')
    })  
})



app.listen(port , () => console.log('API sedang Jalan di Port ' + port) )
