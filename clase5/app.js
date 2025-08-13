import express, { json } from "express";
import { peliculaModel } from "./routes/peliculas.js"; // Importamos el router de peliculas

export function createApp({ PeliculaModel }) {
  const app = express();
  app.disable("x-powered-by");

  const puerto = process.env.puerto || 3000;

  app.use(json());

  app.get("/", (req, res) => {
    res.send("<h1>Hola Mundo</h1>");
  });

  app.use("/peliculas", peliculaModel({ PeliculaModel })); // Esto dice que cuando nos pidan algo con /peliculas, se lo pasamos al router de peliculas

  app.use((req, res) => {
    res.status(404).send("Recurso no encontrado");
  });

  app.listen(puerto, () => {
    console.log(`Servidor escuchando en http://localhost:${puerto}`);
  });
}
