const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();

const items = ['Study Node.JS', 'Buy food', 'Take vaccine'];
const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    const today   = new Date();
    const options = {
        weekday: 'long',
        day    : 'numeric',
        month  : 'long',
    };

    const day = today.toLocaleDateString("en-us", options);

    // Render can be only triggered once, so all values must be provided 
    // (we can declare an empty value at the beggining and change it with post later)
    res.render('list', { listTitle: day, newItems: items, });

});

app.post('/', (req, res) => {

    let newItem = req.body.newItem;
    console.log(req.body.listButton)
    if (req.body.list === "Work List") {
        
        workItems.push(newItem)
        res.redirect('/work')

    } else {

        items.push(newItem)
        res.redirect('/')   
    }   
    // Redirect will make the page to load again and render with new information
})

app.get('/work', (req, res) => {
    res.render('list', {listTitle: "Work List", newItems: workItems})
});

app.post('/work', (req, res) => {
    const newItem = req.body.newItem;
    workItems.push(newItem)
    // Redirect will make the page to load again and render with new information
    res.redirect('/work')
})





app.listen(3000, () => {
    console.log("Server is running on port 3000")
})