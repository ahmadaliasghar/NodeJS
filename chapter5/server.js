const http = require('http');
const express = require('express')
const app = express()
const path = require('path');

const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter { };

const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvents(msg, fileName));
const PORT = process.env.PORT || 3500;


app.get('/hello(.html)?',(req,res,next)=>{
console.log("attempt to load hello.html")
next()
}, (req, res)=> {
    res.send("Hello Loaded")
})

// ^/ must begin with 
// /$ must end with 
app.get('^/$|/index(.html)?', (req, res)=> {
    // res.send("Hello World")
    // res.sendFile('./views/index.html', {root: __dirname})
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})
app.get('/new-page(.html)?', (req, res)=> {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'))
})
app.get('/old-page(.html)?', (req, res)=> {
    // res.redirect('/new-page.html') //302 by default
    res.redirect(301,'/new-page.html') //301
})
app.get('/*', (req, res)=> {
    // res.sendFile(path.join(__dirname, 'views', '404.html')) //404
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html')) //404
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));