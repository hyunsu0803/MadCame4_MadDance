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
    scoreRecord.push({
        UserName : "hyemin",
        UserScore : 90
    })
    connection.query('select * from brd1', function(error, results, fields){
        if(error){
            console.log(error);
        }else{
            console.log(results);
            for(i=0; i<results.length; i++){
                scoreRecord.push({
                    UserName : results[i].UserName,
                    UserScore : results[i].UserScore
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