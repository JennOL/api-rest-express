import { validateMovie, validatePartialMovie } from "../schemas/movies.js";

export class MovieController {
  constructor({ movieModel }) {
    this.movieModel = movieModel;
  }

  getAll = async (req, res) => {
    const { genre } = req.query;
    const movies = await this.movieModel.getAll({ genre });
    res.json(movies);
    return;
  };

  getById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing id" });
    }
    const movie = await this.movieModel.getById({ id });
    res.json(movie);
    return;
  };

  create = async (req, res) => {
    const result = validateMovie(req.body);
    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }

    const newMovie = await this.movieModel.create({ input: result.data });
    return res.status(201).json(newMovie);
  };

  update = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing id" });
    }

    const result = validatePartialMovie(req.body);
    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }

    const updatedMovie = await this.movieModel.update({
      id,
      input: result.data,
    });
    if (updatedMovie === false) {
      return res.status(404).json({ error: "Movie not found" });
    }

    return res.json(updatedMovie);
  };

  delete = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing id" });
    }

    const result = await this.movieModel.delete({ id });
    if (result === false) {
      return res.status(404).json({ error: "Movie not found" });
    }

    return res.json({ message: "Movie deleted" });
  };
}
