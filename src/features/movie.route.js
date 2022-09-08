//importing express
const express = require("express");
//crearting router app
const app = express.Router();
//importing the movies from schema
const movies = require("./movies.schema");

//Get req for a movie search
app.get("/search", async (req, res) => {
  const { q } = req.query;
  try {
    let mov = await movies.find({ movie_name: { $regex: q } });
    res.send(mov);
  } catch (e) {
    console.log(e.message);
  }
});

//GET req for all movies
app.get("/", async (req, res) => {
  const {
    page = 1,
    limit = 10,
    orderBy = "movie_name",
    order = "asc",
  } = req.query;
  try {
    let mov = await movies
      .find({}, { _id: 0, movie_name: 1, id: 1, gerne: 1, runtime: 1, year: 1 })
      .sort({ [orderBy]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.send(mov);
  } catch (err) {
    console.log(err.message);
  }
});

//POST req to the database
app.post("/", async (req, res) => {
  let mov = req.body;
  try {
    let newMov = await movies.create(mov);
    res.send(newMov);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

//Delete req from the database
app.delete("/:id", (req, res) => {
  let { id } = req.params;
  movies
    .findOneAndRemove({ id: id })
    .then((user) => {
      if (!user) {
        res.status(400).send(id + " was not found");
      } else {
        res.status(200).send(id + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

module.exports = app;
