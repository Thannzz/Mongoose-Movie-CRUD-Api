//impoting mongoose
const mongoose = require("mongoose");

//creating the schema for the datas
const movieSchema = new mongoose.Schema({
  id: { type: Number },
  movie_name: { type: String, required: true, unique: true },
  gerne: { type: String },
  year: String,
  release_date: Date,
  runtime: { type: Number, required: true },
});

//creating the model
const movie = mongoose.model("movie", movieSchema);

module.exports = movie;
