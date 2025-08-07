//Express es un framework para Node.js que facilita la creación de aplicaciones web y APIs.
const express = require("express");
const app = express();

// //El middleware es una funcion que sirve para interceptar las peticiones y respuestas, permitiendo modificar o procesar los datos antes de que lleguen al manejador final.
// app.use((req, res, next) => { //Sepone .use perouede poner un metodo especifico para que se ejecute solo para ese verbo http, o poner como primer argumento un path para que se ejecute solo para ese path
//   if (req.method != "POST") return next(); //next() es una funcion que se debe llamar para que la peticion continue al siguiente middleware o manejador de ruta, si no se llama, la peticion se queda y no recibe respuesta ni sigue.
//   if (req.headers["content-type"] != "application/json") return next(); //Si el content-type no es application/json, se salta este middleware

//   //Extrayendo logica de un post en un middleware para no repetir codigo
//   let body = "";
//   req.on("data", (chunk) => {
//     body += chunk.toString();
//   });
//   req.on("end", () => {
//     const data = JSON.parse(body);
//     //mutar la request y meter la info en el request.body
//     req.body = data;
//     next();
//   });
// });

app.use(express.json()); //Middleware por defecto de express para parsear el cuerpo de las peticiones a JSON, si no se pone, no se puede acceder al req.body

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
  res.status(201).json(req.body); //201 es el estatus por defecto para crear un recurso
});

//Forma global de tratar rutas no definidas, siempre va buscando ade arriba a abajo por eso debe ser la ultima
app.use((req, res) => {
  //el .use hace que se ejecute para cualquier verbo http
  res.status(404).send("<h1>Página no encontrada</h1>");
});

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
