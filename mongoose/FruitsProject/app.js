// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Create a new schema with the structure of our data using a js object
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    }, 
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String,
})

// After creating the schema we use it to create a mangoose model
// which acepts the name of the new collection (singular) that will
// be converted to plural on collection name
const Fruit = mongoose.model("Fruit", fruitSchema);

// Creating a new fruit document
const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit.",
});

// Saving a fruit document into a Fruits collection inside fruitsDB 
// (RUN ONLY ONCE AN THEN COMMENT or it will save more objects)
// fruit.save().then() => console.log("Saved.")

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema,
})

const Person = mongoose.model("Person", personSchema);

const pinapple = new Fruit({
    name: "Pinapple",
    rating: 10,
    review: "Sweet sweet pinapple"
})

// pinapple.save()

const person = new Person({
    name: "Ammy",
    age: 12,
    favouriteFruit: pinapple,
})

// person.save()


// const person = new Person({
//     name: "John",
//     age: 37
// })


// const kiwi = new Fruit({
//     name: "Kiwi",
//     score: 10,
//     review: "The best fruit!"
// })

// const orange = new Fruit({
//     name: "Orange",
//     score: 4,
//     review: "Too sour for me"
// })

// const banana = new Fruit({
//     name: "Banana",
//     score: 3,
//     review: "Weird texture"
//   });

// Insert an array of fruits into the collection
// Fruit.insertMany([kiwi, orange, banana]).then (function () {
//     console.log("Successfully saved all the fruits to fruitsDB.");
//   }) .catch(function (err) {
//     console.log(err);
//   });

// Fruit.find().then(fruits => {
//     mongoose.connection.close();
//     fruits.forEach(fruit => {
//         console.log(fruit.name)
//     })
// })
//     .catch(err => {
//         console.log(err);
//     });


// Fruit.updateOne(
//     { _id: "643eac4fb394859f4546d19a" }, 
//     { rating: 10 }).then( 
//         () => { console.log("Successfully updated the fruit to fruitsDB.");
//     }).catch( (err) => {
//         console.log(err);
//     });

    
// Fruit.deleteOne({ _id: "643eac4fb394859f4546d19a" }).then( 
//         () => { console.log("Successfully deleted");
//     }).catch( (err) => {
//         console.log(err);
//     });

// Delete all records with rating > 5
// Fruit.deleteMany()

// const blueberry = new Fruit({
//     name: "Blueberry",
//     rating: "9",
//     review: "Too delicious but also expensive"
// })

// blueberry.save()

// Person.updateOne(
//     { name: "John" }, 
//     { favouriteFruit: blueberry}).then( 
//         () => { console.log("Successfully updated the fruit to fruitsDB.");
//     }).catch( (err) => {
//         console.log(err);
//     });

// mongoose.connection.close();

Person.deleteOne({ _id: "643ec5f67365ad8acdba25c9" }).then( 
        () => { console.log("Successfully deleted");
    }).catch( (err) => {
        console.log(err);
    });