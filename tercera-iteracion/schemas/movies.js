import zod from "zod";

const movieSchema = zod.object({
  title: zod
    .string({
      invalid_type_error: "Title is required",
      required_error: "Title is required",
    })
    .min(1),
  year: zod.number().int().min(1900).max(new Date().getFullYear()),
  director: zod.string().min(1),
  duration: zod.number().int().positive(),
  rate: zod.number().min(0).max(10).default(5),
  poster: zod.string().url({
    message: "Poster must be a valid URL",
  }),
  genre: zod
    .array(
      zod.enum(
        [
          "Action",
          "Adventure",
          "Comedy",
          "Drama",
          "Fantasy",
          "Horror",
          "Thriller",
          "Sci-Fi",
        ],
        {
          required_error: "Movie genre is required",
          invalid_type_error: "Movie genre must be an array of enum Genre",
        }
      )
    )
    .min(1),
});

export function validateMovie(input) {
  return movieSchema.safeParse(input);
}

export function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object);
}
