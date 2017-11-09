const pg = require('pg');
const postGresURL = 'postgres://localhost:5432/twitterdb';
const client = new pg.Client(postGresURL);
client.connect();
module.exports = client;