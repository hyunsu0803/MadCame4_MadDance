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
            for(i=0; i<results.length; i++){
                scoreRecord.push({
                    rnk : results[i].rank,
                    name : results[i].UserName,
                    score : results[i].UserScore
                })
            }
            res.send(scoreRecord);
        }
    })
});

router.post("/add", (req,res) => {
    res.send();
})
router.post("/update", (req,res) => {
    res.send();
})

module.exports = router;