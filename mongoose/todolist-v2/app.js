// Import module:
// const date = require(__dirname + "/date.js");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const lodash = require('lodash')
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Creating a Schema for Home List
const itemsSchema = new mongoose.Schema({
  name: String,
})

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todolist!"
})

const item2 = new Item({
  name: "Hit the button + to add a new item."
})

const item3 = new Item({
  name: "Check the box to delete a task."
})

const defaultItems = [item1, item2, item3]


// Creating a schema for custom page lists
const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
})

const List = mongoose.model("List", listSchema)


app.get("/", (req, res) => {

  // Getting the db data and rendering to our website
  Item.find({}).then(foundItems => {
    // Will only insert default items in DB if the collection is empty:
    if (foundItems.length === 0) {

      Item.insertMany(defaultItems).then(() => {
        console.log("Successfully saved all the items to DB.");
      }).catch(err => {
        console.log(err);
      });
      // To show the newly inserted default items, will redirect to the home route
      res.redirect('/')

    } else {
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }

  })
    .catch(err => {
      console.log(err);
    });

});


app.get('/:customListName', (req, res) => {
  const customListName = lodash.lowerCase(req.params.customListName);

  List.findOne({ name: customListName }).then(foundList => {
    if (!foundList) {
      // Create a new list
      const list = new List({
        name: customListName,
        items: defaultItems,
      })

      list.save()
      res.redirect(`/${customListName}`)
    } else {
      // Show an existing list
      res.render("list", { listTitle: customListName, newListItems: foundList.items })
    }

  }).catch(err => {
    console.log(err);
  });


})



app.post("/", (req, res) => {

  const itemName = req.body.newItem;
  // Will get the value associated with the button, which changes depending on page title/route:
  const listName = req.body.listBtn;

  newItem = new Item({
    name: itemName
  })
  // Checks if it's the default list:
  if (listName === "Today") {
    newItem.save();
    res.redirect('/')

  } else {
    List.findOne({ name: listName }).then(foundList => {
      foundList.items.push(newItem)
      foundList.save()
      res.redirect(`/${listName}`)
    })
  }

});


app.post("/delete", (req, res) => {
  // When checkbox is selected, will post to this route
  // The value in chechbox is set to the item id 
  const itemId = req.body.checkBox
  // From the input hidden:
  const listName = req.body.listName

  if (listName === "Today") {

    Item.findByIdAndDelete(itemId).then(
      () => {
        console.log("Successfully deleted by ID");
      }).catch((err) => {
        console.log(err);
      });

    res.redirect('/')

  } else {
    // 1param: Find the a document inside the List collection with listName
    // 2param: From this document, remove the item with itemId inside the items array
    List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: itemId } } }).then(foundList => {
      res.redirect(`/${listName}`)
    })

  }
});



app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
