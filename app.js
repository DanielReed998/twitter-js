const express = require('express');
const app = express();

app.use((request, response, next)=>{
    console.log(`route: ${request.path}`)
    console.log(`method: ${request.method}`)
    next();
})

app.get('/',(request, response)=>{
    response.status(200).send("Hello world");
})
app.get('/news',(request, response)=>{
    response.status(200).send("<h1>No news</h1>");
})


app.listen(3001,()=>{
    console.log('server listening');
})

