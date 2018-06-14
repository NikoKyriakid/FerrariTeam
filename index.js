const express = require('express')
const app = express();
app.use(express.static('frontEnd'))

const mysql = require('mysql');


var con = mysql.createConnection({
    host: "ferrari-db",
    user: "root",
    password: "password"
});

con.connect(function (err) {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log("Connected to db!")
});

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/users', function (req, res) {

    let sql = 'SELECT * from ferrariteam.user_info';
    let people = [];



    con.query(sql, function (err, rows) {
        if (err) {
            console.log(err);
            throw err;
        }
        rows.forEach(row => {
            people.push({
                id: row.id,
                firstName: row.firstName,
                lastName: row.lastName,
            });
        });

        res.json(people);
    });

})

app.get('/user/:id', function (req, res) {



    let id = req.params.id;

    if (isNaN(id)) {
        res.status(400).json({ message: 'invalid parameter' });
        return;
    }

    let sql = 'SELECT * from ferrariteam.user_info WHERE id = ' + req.params.id;



    con.query(sql, function (err, rows) {
        if (err) {
            console.log(err);
            throw err;
        }

        let row = rows[0];

        if (row != null) {
            res.json({
                id: row.id,
                firstName: row.firstName,
                lastName: row.lastName,
                nationality: row.nationality,
                age: row.age
            });
        } else {
            res.json(null);
        }


    })

    //res.send(sql);
});


app.get("/ciao", (req, res) => res.send("burp"))

app.listen(3000, () => console.log('Example app listening on port 3000!'));
