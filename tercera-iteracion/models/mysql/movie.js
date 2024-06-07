import mysql from "mysql2/promise";

const config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "moviesdb",
  port: 3306,
  multipleStatements: true,
};

const connection = await mysql.createConnection(config);
export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();

      const [movies, tableInfo] = await connection.query(
        ` SELECT  BIN_TO_UUID(M.id) AS id, M.title, M.year, M.director, M.duration, M.poster, M.rate, 
                  (
                    SELECT GROUP_CONCAT(G.name) AS genres 
                          FROM genres AS G 
                          WHERE G.id IN ( SELECT genre_id FROM movie_genreS WHERE movie_id = M.id)
                  ) AS genres
          FROM    movies AS M
                  INNER JOIN movie_genreS AS MG ON(M.id = MG.movie_id)
                  INNER JOIN genres AS G ON(MG.genre_id = G.id)
          WHERE   LOWER(G.name) = ?`,
        [lowerCaseGenre]
      );
      return movies;
    }

    const [movies, tableInfo] = await connection.query(
      `SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate FROM movies`
    );

    return movies;
  }

  static async getById({ id }) {
    if (id === "") return [];

    const [movie] = await connection.query(
      ` SELECT  BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate 
        FROM    movies 
        WHERE   BIN_TO_UUID(id) = ?`,
      [id]
    );

    return movie.length > 0 ? movie[0] : [];
  }

  static async create({ input }) {
    const { title, year, director, duration, poster, genre, rate } = input;
    const [uuidResult] = await connection.query(`SELECT UUID() uuid`);
    const [{ uuid }] = uuidResult;

    try {
      const [result] = await connection.query(
        `INSERT INTO movies (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)`,
        [uuid, title, year, director, duration, poster, rate]
      );
    } catch (error) {
      throw new Error("Error creating a movie");
    }

    const genres = genre.map((g) => `"${g.toLowerCase()}"`).join(",");
    const [genre_ids] = await connection.query(
      `SELECT id FROM genres WHERE LOWER(name) IN (${genres})`
    );

    try {
      genre_ids.forEach(async (genre_id) => {
        const [result] = await connection.query(
          `INSERT INTO movie_genreS (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?)`,
          [uuid, genre_id.id]
        );
      });
    } catch (error) {
      throw new Error("Error assingning the genres");
    }

    const movie = await this.getById({ id: uuid });
    return movie;
  }

  static async update({ id, input }) {
    const query = [];
    const values = [];
    let result;

    for (const key in input) {
      query.push(` ${key} = ?`);
      values.push(input[key]);
    }

    values.push(id);

    try {
      [result] = await connection.query(
        ` UPDATE movies SET ${query.join(",")} WHERE BIN_TO_UUID(id) = ? `,
        values
      );
    } catch (error) {
      throw new Error("Error updating a movie");
    }

    if (result["affectedRows"] === 0) {
      return false;
    } else {
      const movie = await this.getById({ id });
      return movie;
    }
  }

  static async delete({ id }) {
    try {
      const [result] = await connection.query(
        `DELETE FROM movies WHERE BIN_TO_UUID(id) = ?`,
        [id]
      );
    } catch (error) {
      throw new Error("Error deleting a movie");
    }

    if (result["affectedRows"] === 0) {
      return false;
    } else {
      return true;
    }
  }
}
