import { readJSON } from "../utils/readJson.js";
import { randomUUID } from "node:crypto";

const movies = readJSON("../utils/movies.json");

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      );
    }
    return movies;
  }

  static async getById({ id }) {
    return movies.find((movie) => movie.id === id);
  }

  static async create({ input }) {
    const newMovie = {
      id: randomUUID(), // uuid v4
      ...input,
    };

    movies.push(newMovie);
    return newMovie;
  }

  static async update({ id, input }) {
    const index = movies.findIndex((m) => m.id === id);
    if (index === -1) return false;

    const updatedMovie = {
      ...movies[index],
      ...input,
    };

    movies[index] = updatedMovie;
    return updatedMovie;
  }

  static async delete({ id }) {
    const index = movies.findIndex((m) => m.id === id);
    if (index === -1) return false;

    movies.splice(index, 1);
    return true;
  }
}
