import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

export const createMovieRouter = ({ movieModel }) => {
  const movieRouter = Router();
  const movieController = new MovieController({ movieModel });

  movieRouter.get("/", movieController.getAll);
  movieRouter.get("/:id", movieController.getById);
  movieRouter.post("/", movieController.create);
  movieRouter.patch("/:id", movieController.update);
  movieRouter.delete("/:id", movieController.delete);

  return movieRouter;
};
