const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const client = require("../db/index.js");

module.exports = function (io) {
    
    router.get('/',(req,res)=>{
        var sql = `SELECT users.id AS user_id,
                    tweets.id AS tweet_id,
                    users.name AS name,
                    tweets.content AS content,
                    picture_url
                     FROM tweets JOIN users 
                    ON users.id = tweets.user_id;`;
        client.query(sql, function (err, result) {
            if (err) console.log(err); // pass errors to Express
            var tweets = result.rows;
            
            res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
          });
    });
      
      router.get('/users/:name', function(req, res) {
          var name = req.params.name;
          var sql =     `SELECT * FROM tweets 
                        JOIN users ON tweets.user_id = users.id
                        WHERE users.name='${name}';`;
          
          client.query(sql, (err, result)=>{
              if (err) console.log(err)
              
            let arrayOfObjects = result.rows;
            console.log(arrayOfObjects);
            
            res.render( 'index', { tweets: arrayOfObjects, 
                showForm: true, userSelected: true, name: name, user_id: arrayOfObjects[0].user_id  } );
          });
          
        });

        router.get('/showTweet/:id', function(req, res) {
            
            var id = parseInt(req.params.id);
            var sql = `SELECT tweets.id, tweets.content, users.name FROM tweets JOIN users
            ON users.id = tweets.user_id WHERE tweets.id=${id};`;
            
            client.query(sql,(err,result)=>{
                let rows = result.rows;
                console.log(rows);
                res.render( 'index', { tweets: rows, showForm: false } );
            });
            
            
          });
      
      router.post('/tweets', function(req, res) {
          //var name = req.body.name;
          var id = req.body.id;
          var text = req.body.text;
          let sql =   `INSERT INTO tweets (user_id, content) 
                        VALUES (${id}, '${text}')`;
                client.query(sql,(err,result)=>{
                    if (err) console.log(err);

                    io.sockets.emit('newTweet', { id: id, text: text});
                    res.redirect('/');
            });
        });
          
        router.post('/newUser', function(req, res) {
            var name = req.body.name;
            var text = req.body.text;

            let sql0 = `INSERT INTO users (name) VALUES ('${name}');`
            client.query(sql0,(err,result0)=>{
                console.log(result0.rows);
                
                if (err) console.log(err);
                let sql1 = `SELECT id FROM users WHERE name='${name}'`;
                client.query(sql1,(err,result1)=>{
                    console.log(result1.rows);
                    
                        if (err) console.log(err);
                        let queriedID = result1.rows[0].id;
                        
                        let sql2 =    `INSERT INTO tweets (user_id, content) 
                                VALUES (${queriedID}, '${text}')`;
                        client.query(sql2,(err,result)=>{
                            if (err) console.log(err);
                            
                    });
                    
                });
        });


            
          
          
          io.sockets.emit('newTweet', { name: name, text: text});
          res.redirect('/');
        });

        
    return router;
  };