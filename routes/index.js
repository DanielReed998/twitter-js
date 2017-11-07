const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

module.exports = function (io) {
    router.get('/', function (req, res) {
        let tweets = tweetBank.list();
        res.render( 'index', { tweets: tweets, showForm: true } );
      });
      
      router.get('/users/:name', function(req, res) {
          var name = req.params.name;
          var list = tweetBank.find( {name: name} );
          res.render( 'index', { tweets: list, showForm: true, name: name } );
        });

        router.get('/showTweet/:id', function(req, res) {
            console.log(`id: ${req.params.id}`)
            var id = parseInt(req.params.id);
            console.log(typeof id)
            var uniqueTweet = tweetBank.find( {id: id} );
            console.log(uniqueTweet);
            res.render( 'index', { tweets: uniqueTweet, showForm: false } );
          });
      
      router.post('/tweets', function(req, res) {
          var name = req.body.name;
          var text = req.body.text;
          tweetBank.add(name, text);
          io.sockets.emit('newTweet', { name: name, text: text});
          res.redirect('/');
        });
    return router;
  };