const express = require('express')
const app = express();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('db/FerrariData.db');

db.on("error", function(error) {
    console.log("Getting an error : ", error);
}); 




app.get('/', (req, res) => res.send('Hello Niko!'))

app.get('/user/:id', function(req, res){
    res.send('Hello ' +req.params)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'));

