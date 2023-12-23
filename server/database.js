const { MongoClient } = require("mongodb");
const { default: mongoose } = require("mongoose");

const URI = process.env.MONGO_URI;
const connectToMongo = () => {
  try {
    mongoose.connect(URI, () => {
      console.log("Connected to mongo successfully");
    });
  } catch (error) {
    console.log("Connecton to mongo failed");
  }
};

module.exports = connectToMongo;
