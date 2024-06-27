const mongooes = require("mongoose");
require("dotenv").config();
const mongourl = process.env.MONGODB_URL;

//this function helps to connect to the mangodb database through the url
const connectToMongoo = async () => {
  try {
    // Connect to MongoDB Atlas
    await mongooes.connect(mongourl);
    console.log("connected to mongodb atlas succesfully");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectToMongoo;
