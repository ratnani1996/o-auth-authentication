const express = require('express')
const app = express();
const morgan = require('morgan')

app.use(morgan('dev'))


app.get('/',(req, res)=>{
    res.send(`This is a get request to ${req.url}`)
})

app.get('/limit', (req, res)=>{
    res.send(`This is a get request to ${req.url}`)
})

app.listen(3000, ()=>{
    console.log(`Listening to port 3000`)
})