// *** Forma futura de como cargar un json
// import movies from "./movies.json" with { type: "json" };

// ** Una manera de pasar de commonJS a module ES 6 para importar los json files
// import fs from "node:fs";
// const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"));

// Forma de importar el json con modulos ES6
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
export const readJSON = (path) => require(path);
