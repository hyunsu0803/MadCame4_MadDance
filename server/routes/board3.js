const express = require("express");
const router = express.Router();
var mysql = require('mysql');
const {createConnection} = require('net');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lhmin35123!',
    database: 'MadDance'
});

router.get("/", (req, res) => {
    var scoreRecord = new Array();
    connection.query('SET @ROWNUM:=0;')
    connection.query('SELECT * FROM brd3 ORDER BY UserScore DESC;', function(error, results, fields){
        if(error){
            console.log(error);
        }else{
            console.log(results);
            const length = results.length<10 ? results.length : 10;
            for(j=0; j<length; j++){
                console.log(j);
                scoreRecord.push({
                    rank : j+1,
                    name : results[j].UserName,
                    score : results[j].UserScore
                })
            }
            res.send(scoreRecord);
        }
    })
});


router.post("/add", (req,res) => {
    console.log("add");
    connection.query('INSERT INTO brd3 (UserName, UserScore) values (?, ?)', [req.body.name, req.body.score], function(error, results, fields){
        if(error){
            console.log(error);
            res.status(404).send();
        }
        else{
            console.log(results);
            res.status(200).send();
        }
    })
})

module.exports = router;