import { validateMovie, validatePartialMovie } from "../schemas/movies.js";
import { MovieModel } from "../models/movie.js";

console.log("--->MovieController");

export class MovieController {
  static async getAll(req, res) {
    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre });
    res.json(movies);
    return;
  }

  static async getById(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing id" });
    }
    const movie = await MovieModel.getById({ id });
    res.json(movie);
    return;
  }

  static async create(req, res) {
    const result = validateMovie(req.body);
    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }

    const newMovie = MovieModel.create({ input: result.data });
    return res.status(201).json(newMovie);
  }

  static async update(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing id" });
    }

    const result = validatePartialMovie(req.body);
    if (result.error) {
      return res.status(422).json({ error: JSON.parse(result.error.message) });
    }

    const updatedMovie = await MovieModel.update({ id, input: result.data });
    if (updatedMovie === false) {
      return res.status(404).json({ error: "Movie not found" });
    }

    return res.json(updatedMovie);
  }

  static async delete(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing id" });
    }

    const result = await MovieModel.delete({ id });
    if (result === false) {
      return res.status(404).json({ error: "Movie not found" });
    }

    return res.status(204).send();
  }
}
