#DROP DATABASE moviesdb;
CREATE DATABASE moviesdb;

USE moviesdb;

CREATE TABLE movies(
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    title VARCHAR(255) NOT NULL, 
    year INT NOT NULL, 
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT,
    rate DECIMAL(2,1) UNSIGNED NOT NULL
);

CREATE TABLE genres(
	id INT auto_increment PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE movie_genres(
	movie_id binary(16) REFERENCES movie(id),
    genre_id int REFERENCES genre(id),
    primary KEY(movie_id, genre_id)
    
);

INSERT INTO genres(name) VALUES
("Action"),
("Drama"),
("Crime"),
("Adventure"),
("Sci-Fi"),
("Romance");


INSERT INTO movies (title, year, director, duration, poster, rate) VALUES
("The Shawshank Redemption", 1994, "Frank Darabont", 142, "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp", 9.0),
("The Dark Knight", 2008, "Christopher Nolan", 152, "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg", 9.0),
("Inception", 2010, "Christopher Nolan",  148, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8),
("Pulp Fiction", 1994, "Quentin Tarantino", 154, "https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg", 8.9),
("Forrest Gump", 1994, "Robert Zemeckis", 142, "https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg", 8.8),
("The Matrix", 1999, "Lana Wachowski", 136, "https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg", 8.7);


INSERT INTO movie_genres (movie_id, genre_id) VALUES
((SELECT id FROM movies WHERE title = "The Shawshank Redemption"), (SELECT id FROM genres WHERE name = "Drama")),
((SELECT id FROM movies WHERE title = "The Dark Knight"), (SELECT id FROM genres WHERE name = "Action")),
((SELECT id FROM movies WHERE title = "The Dark Knight"), (SELECT id FROM genres WHERE name = "Crime")),
((SELECT id FROM movies WHERE title = "The Dark Knight"), (SELECT id FROM genres WHERE name = "Drama")),
((SELECT id FROM movies WHERE title = "Inception"), (SELECT id FROM genres WHERE name = "Action")),
((SELECT id FROM movies WHERE title = "Inception"), (SELECT id FROM genres WHERE name = "Adventure")),
((SELECT id FROM movies WHERE title = "Inception"), (SELECT id FROM genres WHERE name = "Sci-Fi")),
((SELECT id FROM movies WHERE title = "Pulp Fiction"), (SELECT id FROM genres WHERE name = "Crime")),
((SELECT id FROM movies WHERE title = "Pulp Fiction"), (SELECT id FROM genres WHERE name = "Drama")),
((SELECT id FROM movies WHERE title = "Forrest Gump"), (SELECT id FROM genres WHERE name = "Drama")),
((SELECT id FROM movies WHERE title = "Forrest Gump"), (SELECT id FROM genres WHERE name = "Romance")),
((SELECT id FROM movies WHERE title = "The Matrix"), (SELECT id FROM genres WHERE name = "Action")),
((SELECT id FROM movies WHERE title = "The Matrix"), (SELECT id FROM genres WHERE name = "Sci-Fi"));