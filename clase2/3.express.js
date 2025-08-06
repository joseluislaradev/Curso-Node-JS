//Express es un framework para Node.js que facilita la creación de aplicaciones web y APIs.
const express = require("express");
const app = express();

app.disable("x-powered-by"); //Deshabilita la cabecera x-powered-by que indica que el servidor está usando Express, por razones de seguridad

const dittoJson = require("./ditto.json");
const puerto = process.env.puerto || 3000;

app.get("/", (req, res) => {
  res.send("<h1>Bienvenido a la API de Pokémon</h1>"); //El estatus por defecto es 200, por lo que no es necesario especificarlo
});

app.get("/pokemon/ditto", (req, res) => {
  res.status(200).json(dittoJson); //EN express a diferencia de node, se encarga de rellenar el content-type dependiendo de lo que mandemos, y en casos como este tambien hace el stringify por nosotros
});

app.post("/pokemon", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const pokemon = JSON.parse(body);
    res.status(201).json(pokemon);
  });
});

//Forma global de tratar rutas no definidas, siempre va buscando ade arriba a abajo por eso debe ser la ultima
app.use((req, res) => {
  //el .use hace que se ejecute para cualquier verbo http
  res.status(404).send("<h1>Página no encontrada</h1>");
});

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
