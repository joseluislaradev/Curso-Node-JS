import peliculas from "../../movies.json" assert { type: "json" };
import { randomUUID } from "crypto";

export class PeliculaModel {
  static async getAll({ inicio, fin, genre }) {
    if (genre) {
      return peliculas
        .filter((p) =>
          p.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
        )
        .slice(inicio, fin);
    }

    return peliculas.slice(inicio, fin);
  }

  static async getById(id) {
    return peliculas.find((p) => p.id === id);
  }

  static async create(data) {
    const nuevaPelicula = {
      id: randomUUID(), //Genera un id unico nativo de react UUID (universally unique identifier)
      ...data,
    };

    //Esto no es rest porque guardamos el estado de la app en memoria, por ahora en lo que hacemos una BD
    peliculas.push(nuevaPelicula);

    return nuevaPelicula;
  }

  static async editar(id, data) {
    const peliculaIndex = peliculas.findIndex((p) => p.id === id);
    if (peliculaIndex === -1) {
      return { status: 404, message: "Pelicula no encontrada" };
    }

    const peliculaActualizada = {
      ...peliculas[peliculaIndex],
      ...data,
    };

    peliculas[peliculaIndex] = peliculaActualizada;
    return peliculaActualizada;
  }

  static async eliminar(id) {
    const peliculaIndex = peliculas.findIndex((p) => p.id === id);
    if (peliculaIndex === -1) {
      return { status: 404, message: "Pelicula no encontrada" };
    }
    peliculas.splice(peliculaIndex, 1);
    return { status: 204, message: "Pelicula eliminada" };
  }
}
