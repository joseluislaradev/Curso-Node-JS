// Get the client
import mysql from "mysql2/promise";

// Create the connection to database
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "moviesDB",
});

export class PeliculaModel {
  static async getAll({ inicio, fin, genre }) {
    if (genre) {
      const lowerGenre = genre.toLowerCase();

      const [genreRows] = await connection.query(
        `SELECT id FROM genre WHERE LOWER(name) = ?`,
        [lowerGenre]
      );

      if (genreRows.length === 0) return [];

      const [{ id }] = genreRows;

      const [rows] = await connection.query(
        `SELECT BIN_TO_UUID(m.id) as id, m.title, m.year, m.director, m.duration, m.poster, m.rate, g.name as genre FROM movies m
          inner join movies_genres mg on mg.idMovie = m.id
          inner join genre g on mg.idGenre = g.id
          where g.id = ? 
          LIMIT ?, ?`,
        [id, inicio, fin]
      );
      return rows;
    }

    const [rows] = await connection.query(
      `SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movies LIMIT ?, ?`,
      [inicio, fin]
    );

    return rows;
  }

  static async getById(id) {
    const [rows] = await connection.query(
      `SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movies WHERE id = UUID_TO_BIN(?)`,
      [id]
    );

    console.log(rows);

    if (rows.length === 0) return null;

    return rows[0];
  }

  static async create(data) {
    const { title, year, director, duration, poster, rate } = data;

    const [rowsUUID] = await connection.query(
      `SELECT UUID_TO_BIN(UUID()) as id`
    );

    const [{ id }] = rowsUUID;

    try {
      const [result] = await connection.query(
        `INSERT INTO movies (id, title, year, director, duration, poster, rate) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, title, year, director, duration, poster, rate]
      );
    } catch (error) {
      console.error("Error inserting movie:", error);
    }

    const [movie] = await connection.query(
      `SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movies WHERE id = ?`,
      [id]
    );

    return movie[0];
  }

  static async editar(id, data) {
    const allowedFields = [
      "title",
      "year",
      "director",
      "duration",
      "poster",
      "rate",
    ];
    const setClauses = [];
    const values = [];

    for (const field of allowedFields) {
      if (data[field] !== undefined) {
        setClauses.push(`${field} = ?`);
        values.push(data[field]);
      }
    }

    if (setClauses.length === 0) {
      return { status: 400, message: "No fields to update" };
    }

    values.push(id);

    const [result] = await connection.query(
      `UPDATE movies SET ${setClauses.join(", ")} WHERE id = UUID_TO_BIN(?)`,
      values
    );

    if (result.affectedRows === 0) {
      return { status: 404, message: "Pelicula no encontrada" };
    }

    const [updatedMovie] = await connection.query(
      `SELECT BIN_TO_UUID(id) as id, title, year, director, duration, poster, rate FROM movies WHERE id = UUID_TO_BIN(?)`,
      [id]
    );

    return updatedMovie[0];
  }

  static async eliminar(id) {
    const [result] = await connection.query(
      `DELETE FROM movies WHERE id = UUID_TO_BIN(?)`,
      [id]
    );

    if (result.affectedRows === 0) {
      return { status: 404, message: "Pelicula no encontrada" };
    }

    return { status: 204, message: "Pelicula eliminada" };
  }
}
