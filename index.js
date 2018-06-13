const express = require('express')
const app = express();
app.use(express.static('frontEnd'))
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('db/FerrariData.db');

db.on("error", function(error) {
    console.log("Getting an error : ", error);
}); 


app.get('/users', function(req, res){

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
            });
        });

        res.json(people);
    });

})

app.get('/user/:id', function(req, res){



    let id = req.params.id;

    if(isNaN(id)){
        res.status(400).json({message: 'invalid parameter'});
        return;
    }

    let sql = 'SELECT * from user_info WHERE id = ' + req.params.id;



    db.all(sql, [], (err, rows) => {
        if(err){
            throw err;
        }

        let row = rows[0];

        if(row != null){
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

app.listen(3000, () => console.log('Example app listening on port 3000!'));
