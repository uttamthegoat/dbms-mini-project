const express = require("express");
const { addMovie, getAllMovies, getMovieById } = require("../controller/movie-controller");

const movieRouter = express.Router();
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", addMovie);

module.exports = movieRouter;