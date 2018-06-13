const express = require('express')
const app = express();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('db/FerrariData.db');

db.on("error", function(error) {
    console.log("Getting an error : ", error);
}); 


app.get('/', function(req, res){

    let sql = 'SELECT * from user_info';
    let people = [];

    

    db.all(sql, [], (err, rows) => {
        if (err) {
          throw err;
        }
        rows.forEach(row => {
            people.push({
                id: row.id,
                firstName: row.firstName,
                lastName: row.lastName,
                nationality: row.nationality,
                age: row.age
            });

            console.log(JSON.stringify({
                id: row.id,
                firstName: row.firstName,
                lastName: row.lastName,
                nationality: row.nationality,
                age: row.age
            }, null, 4));

            console.log(row.firstName);
            console.log(row.lastName);
        });

        res.json(people);
    });

})

app.get('/user/:id', function(req, res){
    res.send('Hello ' +req.params)
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
