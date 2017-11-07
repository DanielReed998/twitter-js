const _ = require('lodash');
const data = [
    {name: "Raul" , content: 'This is my first tweet', id: 1},
    {name: "Alyssa" , content: 'I have unnecessarily strong political beliefs', id: 2}
];

let tweetCount = 2

function add (name, content) {

    data.push({ name: name, content: content, id: ++tweetCount });
  }
  
  function list () {
    return _.cloneDeep(data);
  }
  
  function find (properties) {
    return _.cloneDeep(_.filter(data, properties));
  }

  module.exports = { add: add, list: list, find: find };

  const randArrayEl = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };
  
  const getFakeName = function() {
    const fakeFirsts = ['Nimit', 'David', 'Shanna', 'Emily', 'Scott', 'Karen', 'Ben', 'Dan', 'Ashi', 'Kate', 'Omri', 'Gabriel', 'Joe', 'Geoff'];
    const fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
    return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
  };
  
  const getFakeTweet = function() {
    const awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing', 'impressive'];
    return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
  };
  
  for (let i = 0; i < 10; i++) {
    module.exports.add( getFakeName(), getFakeTweet() );
  }

