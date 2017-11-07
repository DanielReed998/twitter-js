const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const app = express();

let context = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};

nunjucks.configure('views',{noCache: true});
nunjucks.render('index.html', context, (err, output)=>{
    if (err) throw err;
    console.log(output);
});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
app.use(express.static('public'))

app.use('/', routes);



app.use((request, response, next)=>{
    console.log(`route: ${request.path}`)
    console.log(`method: ${request.method}`)
    next();
})

// app.get('/',(request, response)=>{
//     // response.status(200).send("Hello world");
//     response.render('index', context);
// })
// app.get('/news',(request, response)=>{
//     response.status(200).send("<h1>No news</h1>");
// })


app.listen(3001,()=>{
    console.log('server listening');
})

