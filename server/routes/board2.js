const express = require("express");
const router = express.Router();
var mysql = require('mysql');
const {createConnection} = require('net');
const connection = require('./connection');

router.get("/", (req, res) => {
    var brd2Record = new Array();
    connection.query('SELECT * FROM brd2 ORDER BY UserScore DESC;', function(error, results, fields){
        if(error){
            console.log(error);
        }else{
            console.log(results);
            const length = results.length<10 ? results.length : 10;
            for(j=0; j<length; j++){
                console.log(j);
                brd2Record.push({
                    rank : j+1,
                    name : results[j].UserName,
                    score : results[j].UserScore
                })
            }
            res.send(brd2Record);
        }
    })
});


router.post("/add", (req,res) => {
    console.log("add");
    connection.query('INSERT INTO brd2 (UserName, UserScore) values (?, ?)', [req.body.name, req.body.score], function(error, results, fields){
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