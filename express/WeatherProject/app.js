const express = require('express');
const app = express();
const port = 3000;

const https = require('node:https');
const bodyParser = require('body-parser')

// Body Parser works with express
app.use(bodyParser.urlencoded({ extended: true }));  // Data that comes from html form


app.get("/", (req, res) => {

    // https module request must use another name for the response callback (!= res)
    res.sendFile(`${__dirname}/index.html`)
});

app.post("/", (req, res) => {

    let city = req.body.city

    const apiKey = ''
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    https.get(url, (response) => {


        response.on('data', (d) => {
            const weatherData = JSON.parse(d)

            if (weatherData.cod >= 200 && weatherData.cod < 300) {
                const temp = weatherData.main.temp
                const description = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`
    

                res.write(`<h1>The temperature in ${city} is ${temp} degrees Celsius.</h1>`)
                res.write(`<p>The weather is currently ${description}</p>`)
                res.write(`<img src="${imgURL}">`)

                res.send()
                
            } else if (weatherData.cod >= 400 && weatherData.cod < 500) {   
                res.send(`Can't find the weather for ${city}`)
            }
            
        });

    }).on('error', (e) => {
        console.error(e);
    });
});

app.listen(port, () => {
    console.log("Server is running on port 3000.")
});