const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());

const mysql = require('mysql');
const con = mysql.createConnection({
    host: "minoritybusiness.c76siigws906.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "tuchus-xuknyS-2gyhna",
    database: "main",
    port: "3306"
});

app.post('/users', (req, res) => {
    if (req.query.username && req.query.email && req.query.age) {
        console.log('Request received');
        con.connect(function(err) {
            con.query(`INSERT INTO main.users (username, email, age) VALUES ('${req.query.username}', '${req.query.email}', '${req.query.age}')`, function(err, result, fields) {
                if (err) res.send(err);
                if (result) res.send({username: req.query.username, email: req.query.email, age: req.query.age});
                if (fields) console.log(fields);
            });
        });
    } else {
        console.log('Missing a parameter');
    }
});

app.get('/users', (req, res) => {
    // res.json({ message: "Hello from server!" });
    con.connect(function(err) {
        con.query(`SELECT * FROM main.users`, function(err, result, fields) {
            if (err) res.send(err);
            if (result) res.json({ result: result });;
        });
    });
});

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
})
app.post('/test', (req, res) => {
    if (req.body.name && req.body.price && req.body.url && req.body.description) {
        console.log('Request received');
        var sql = `INSERT INTO Products (Name, Price, Description, URL) VALUES 
        ('${req.body.name}', '${parseFloat(req.body.price)}', '${req.body.description}', '${req.body.url}')`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    } else {
        console.log('Missing a parameter');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
