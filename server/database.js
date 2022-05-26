const { MongoClient } = require('mongodb');
const { default: mongoose } = require('mongoose');

const URI = "mongodb+srv://nav:6W5uVpnbrmGj6hFr@cluster0.n6qly.mongodb.net/?retryWrites=true&w=majority"
const connectToMongo = () => {
    mongoose.connect(URI, () => {
        console.log("Connected to mongo successfully");
    })
}

module.exports = connectToMongo;