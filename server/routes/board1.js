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
    connection.query('SELECT @ROWNUM:=@ROWNUM+1 AS rank, A.* FROM brd1 A ORDER BY UserScore DESC;', function(error, results, fields){
        if(error){
            console.log(error);
        }else{
            console.log(results);
            for(i=0; i<10; i++){
                scoreRecord.push({
                    rank : results[i].rank,
                    name : results[i].UserName,
                    score : results[i].UserScore
                })
            }
            res.send(scoreRecord);
        }
    })
});


router.post("/add", (req,res) => {
    console.log("add");
    connection.query('INSERT INTO brd1 (UserName, UserScore) values (?, ?)', [req.body.name, req.body.score], function(error, results, fields){
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