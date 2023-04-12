const bodyParser = require('body-parser')
const request = require('request')

const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Create a folder to keep as our static folder. On html we use the path without folder name
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/signup.html`)
})

// Always check if the form on html has method and action
app.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    console.log(firstName, lastName, email)

    // Mailchimp settings
    let data = {
        members: [
            {email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }}
        ]
    };

    let jsonData = JSON.stringify(data);

    let options = {
        url: 'https://us3.api.mailchimp.com/3.0/lists/LISTID',
        method: 'POST',
        headers:{
            "Authorization": "sabrina_veras@live.com API KEY"
        },
        body: jsonData
    }

    request(options, function (error, response, body) {
        if (error) {
            console.log(error)
            res.sendFile(`${__dirname}/failure.html`)
        } else {
            console.log(response.statusCode);
            if (response.statusCode === 200) {
                res.sendFile(`${__dirname}/success.html`)
            } else {
                res.sendFile(`${__dirname}/failure.html`)
            }
        }
    })

})

app.post('/failure', (req, res) => {
    res.redirect('/')
})

app.post('/success', (req, res) => {
    res.redirect('/')
})


app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000")
})