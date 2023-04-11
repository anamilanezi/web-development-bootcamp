const express = require('express');
const app = express();
const port = 3000;

const https = require('node:https');



app.get("/", (req, res) => {

    // https module request must use another name for the response callback (!= res)
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Criciuma&units=metric&appid=f6e33309496a5af1c621dbd6fcc67207'
    
    https.get(url, (response) => {
        
        // console.log('statusCode:', response.statusCode);
        // console.log('headers:', response.headers);


        // Parsing the requested data 
        response.on('data', (d) => {
            const weatherData = JSON.parse(d)

            const temp = weatherData.main.temp
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon

            const imgURL = `https://openweathermap.org/img/wn/${icon}@2x.png`

            res.write(`<h1>The temperature in Criciúma is ${temp}°C</h1>`)
            res.write(`The weather is currently ${description}`)
            res.write(`<img src="${imgURL}">`)
            res.send()
        });

    }).on('error', (e) => {
        console.error(e);
    });

    
    // response.sendFile(`${__dirname}/index.html`)
});


app.listen(port, () => {
    console.log("Server is running on port 3000.")
});