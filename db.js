const mongooes = require("mongoose");
const mongourl = "mongodb://localhost:27017/?directConnection=true";

//this function helps to connect to the mangodb database through the url
const connectToMongoo = async () => {
  try {
    mongooes.connect(mongourl);
    console.log("connected to monogooes succesfully");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectToMongoo;
