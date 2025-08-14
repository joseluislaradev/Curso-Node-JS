import express from "express";
import morgan from "morgan"; //Es un paquete que es un logger, lleva la traza de la request dandonos informacion

const puerto = process.env.PORT || 3000;

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  return res.sendFile(process.cwd() + "/client/index.html"); //process es la ruta actual(donde se esta ejecutando) ya nada mas la sacamos con la funcion cwd()
});

app.use((req, res) => {
  return res.status(404).send("<h1>Recurso no encontrado</h1>");
});

app.listen(puerto, () => {
  console.log(`Localhost corriendo en: http://localhost:${puerto}`);
});
