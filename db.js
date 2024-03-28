const mongooes = require("mongoose");
const mongourl = "mongodb+srv://thaparoman970:o8uh3kRmWEl9HW16@cluster0.7a2motw.mongodb.net/";

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
