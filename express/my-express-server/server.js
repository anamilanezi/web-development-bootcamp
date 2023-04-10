const express = require('express')
const app = express()
const port = 3000;

// root 
app.get('/', (request, response) => {
    console.log(request)
    response.send("<h1>Hello World!</h1>");
})

// routes 
app.get('/about', (req, res) => {
    res.send("I'm a biologist learning how to program");
})

app.get('/contact', (req, res) => {
    res.send("Contact me");
})

app.get('/hobbies', (req, res) => {
    res.send("I like dogs, cats and coffee");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})