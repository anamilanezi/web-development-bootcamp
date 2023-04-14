const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Body Parser works with express
app.use(bodyParser.urlencoded({extended: true}));  // Data that comes from html form

// Root 

// __dirname gives the curent directory 
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
});

app.post('/', (req, res) => {
    let num1 = Number(req.body.num1);
    let num2 = parseFloat(req.body.num2);

    let result = num1 + num2;
    res.send(`The result of ${num1} + ${num2} is equal to ${result}`)
})

// BMI Calculator route 

app.get('/bmicalculator', (req, res) => {
    res.sendFile(`${__dirname}/bmiCalculator.html`)
})

app.post('/bmicalculator', (req, res) => {

    let weight = parseFloat(req.body.weight)
    let height = parseFloat(req.body.height) 

    let bmi = weight / (height * height)
    res.send(`Your BMI is ${bmi}`)

})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
