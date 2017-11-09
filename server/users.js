const express = require('express');
const router = express.Router();
const {pool} = require('../config');
const moment = require('moment');

router.post('/', (req, res) =>{
  let {firstname, lastname, email, password} = req.body
  let obj = {first_name: firstname, last_name: lastname, email, password, created_date:moment(new Date()).format("YYYY-MM-DD HH:MM:ss")}
  pool.getConnection(function(err, connection){
    connection.query('INSERT INTO users SET ?', obj, function(error, results){
      connection.release()
      console.log(error)
      if(error) return res.status(500).json({
        success: false,
        data: "problem"
      })
      if(results){
        console.log(results)
        res.status(201).json({result: "success"})
    }
    })
  })
  //console.log(req.body)
  //res.status(201).json({result: "success"})
});



router.get('/', (req, res) =>{
  pool.getConnection(function(err, connection){
    connection.query('SELECT * FROM users', function(error, results){
      connection.release()
      console.log(error)
      if(error) return res.status(500).json({
        success: false,
        data: "problem"
      })
      if(results){
        console.log(results)
        res.status(201).json({success: true, data:results})
    }
    })
  })
});



router.get('/:userid', (req, res) =>{
  let userid = req.params.userid;
  pool.getConnection(function(err, connection){
    connection.query('SELECT * FROM users where id = ?', [userid], function(error, results){
      connection.release()
      console.log(error)
      if(error) return res.status(500).json({
        success: false,
        data: "problem"
      })
      if(results){
        console.log(results)
        res.status(201).json({success: true, data:results[0]})
    }
    })
  })
});


router.put('/', (req, res) =>{
  let {firstname, lastname, email, password, userid} = req.body
  pool.getConnection(function(err, connection){
    connection.query('UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?', [firstname, lastname, email, userid], function(error, results){
      connection.release()
      console.log(error)
      if(error) return res.status(500).json({
        success: false,
        data: "problem"
      })
      if(results){
        console.log(results)
        res.status(201).json({result: "success"})
    }
    })
  })
  //console.log(req.body)
  //res.status(201).json({result: "success"})
});

module.exports = router;
