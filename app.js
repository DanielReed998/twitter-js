const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const app = express();


let context = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};

const server = app.listen(3001,()=>{
    console.log('server listening');
})

const io = socketio.listen(server);

nunjucks.configure('views',{noCache: true});
nunjucks.render('index.html', context, (err, output)=>{
    if (err) throw err;
    
});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.use('/', routes(io));



app.use((request, response, next)=>{
    
    next();
})

// app.get('/',(request, response)=>{
//     // response.status(200).send("Hello world");
//     response.render('index', context);
// })
// app.get('/news',(request, response)=>{
//     response.status(200).send("<h1>No news</h1>");
// })




