const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

app.get('/', async (req,res)=>{
    await insertName()
    await MontaHtml(res)
})

async function insertName(){
    const mysql = require('mysql');
    const connection = mysql.createConnection(config);
    const insert = "INSERT INTO people(name) values('Mario')";
    var a = connection.query(insert);
    await a;
    connection.end();
}

async function MontaHtml(res){
    const mysql = require('mysql');
    const connection = mysql.createConnection(config);
    const sql = "SELECT name FROM people;";
    connection.query(
        sql, function (err, rows) {
            var htmlPage = "<h1>Full Cycle Rocks!!</h1> <ul>";
            rows.forEach(element => {
                htmlPage += "<li>" + element.name + "</li>"
            });
            htmlPage += "</ul>";
            res.send(htmlPage);
        });
    connection.end();
}

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port );
})