const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://thani:thani@cluster0.acauyxg.mongodb.net/day-3"
  );
};

module.exports = connect;
