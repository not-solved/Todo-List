const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

app.get('/api/todos', (request, response) => {
    let SQL = 'SELECT * FROM TODAY';
    connection.query(SQL, (err, rows, fields) => {
        if(err) throw err;
        response.send(rows);
    })
});


app.post('/api/todos', (request, response) => {
    let SQL = 'INSERT INTO TODAY VALUES (null, ?, ?, ?, false)';
    let params = [ request.body.title, request.body.memo, request.body.deadline ];
    console.log(params);

    connection.query(SQL, params, (err, rows, fields) => {
        if(err) throw err;
        response.send(rows);
    }) 

});

// Toggle 업데이트 실시간 반영
app.put('/api/todos/toggle/:id/:checked', (request, response) => {
    let SQL = 'UPDATE TODAY SET checked = ? WHERE id = ?';
    let checked = '';
    if([ request.params.checked ] == true) checked = false;
    else checked = true;
    let id = [request.params.id];
    let params = [checked, id];
    connection.query(SQL, params, (err, rows, fields) => {
        if(err) throw err;
        response.send(rows);
    })

})

// '수정'을 눌러 내용을 수정
app.put('/api/todos/:id', (request, response) => {
    let SQL = 'UPDATE TODAY SET title = ?, memo = ?, deadline = ? WHERE id = ?';
    console.log(request.body);
    console.log(request.params.id);
    let ID = [request.params.id];
    let params = [ request.body.title, request.body.memo, request.body.deadline, ID ];
    connection.query(SQL, params, (err, rows, fields) => {
        if(err) throw err;
        response.send(rows);
    })
    
})


app.delete('/api/todos/:id', (request, response) => {
    let SQL = 'DELETE FROM TODAY WHERE id = ?';
    let params = [request.params.id];
    connection.query(SQL, params, (err, rows, fields) => {
        if(err) throw err;
        response.send(rows);
    })
});

/*
app.update();
*/

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})