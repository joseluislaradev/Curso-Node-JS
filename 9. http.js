const http = require("node:http"); // Permite hacer cosas http como crear un servidor, hacer y recibir peticiones, etc.
const { findFreePort } = require("./10.free-port.js"); // Importa la función findFreePort del archivo free-port.js para encontrar un puerto libre

const port = process.env.PORT || 3000; // Puerto por defecto donde intentaremos iniciar el servidor

const server = http.createServer((req, res) => {
  // Crea un servidor HTTP, el cual tiene un callback que recibe la peticion y la respuesta que son lo que se hace con un servidor
  console.log("Petición recibida:", req.method, req.url); // Muestra en consola el metodo de la peticion y la url solicitada
  res.writeHead(200, { "Content-Type": "text/plain" }); // Establece el codigo de estado y el tipo de contenido de la respuesta
  res.end("Hola, mundo!"); // Termina la respuesta con el mensaje "Hola, mundo!"
});

findFreePort(port) // Busca un puerto libre a partir del puerto 3000
  .then((port) => {
    server.listen(port, () => {
      // Inicia el servidor en el puerto encontrado
      console.log(`Servidor escuchando en http://localhost:${port}`); // Muestra en consola la URL donde está escuchando el servidor
    });
  });
