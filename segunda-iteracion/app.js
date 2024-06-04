import express, { json } from "express";

import { movieRouter } from "./routes/movies.js";
import { corsMiddleware } from "./middlewares/cors.js";

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by"); // deshabilitar el header x-Powered-By: Express

// Se cargan todas las rutas de /movies
app.use("/movies", movieRouter);

const PORT = process.env.PORTa || 3001;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
