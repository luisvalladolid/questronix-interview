const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'inventorydb'
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(3000,()=>console.log('Express server is running at port no : 3000'));

// get all items
app.get('/items', (req, res)=>{
    mysqlConnection.query('SELECT * FROM items', (err, rows, fields) =>{
        if(!err)
        res.send(rows)
        else
        console.log(err);
    });
});

// get an item
app.get('/items/:id', (req, res)=>{
    mysqlConnection.query('SELECT * FROM items WHERE id = ?',[req.params.id], (err, rows, fields) =>{
        if(!err)
        res.send(rows)
        else
        console.log(err);
    });
});

// delete an item
app.get('/items/:id', (req, res)=>{
    mysqlConnection.query('DELETE items WHERE id = ?',[req.params.id], (err, rows, fields) =>{
        if(!err)
        res.send('Deleted successfully')
        else
        console.log(err);
    });
});