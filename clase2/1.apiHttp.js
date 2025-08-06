const http = require("node:http");
const fs = require("node:fs/promises");

const puerto = process.env.puerto || 3000;

const processRequest = (req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("Hola, Mundo");
    return;
  } else if (req.url === "/imagen.jpg") {
    fs.readFile("./foto.jpg")
      .then((data) => {
        //NOsotros usamos data que es lo que recibimos , nosotros trabajamos con un buffer que es un array de bytes que representan a la imagen, nuestor servidor no entiende que es pero sabe los bites
        res.writeHead(200, { "Content-Type": "image/jpg" });
        res.end(data); //Enviamos los datos bianrios como los entendemos nosotros y gracias a qeu el encabe de arriba le decimos que es una imagen jpg y el navegador sabe que hacer con eso
      })
      .catch((error) => {
        console.error("Error al leer la imagen:", error);
        res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>Imagen no encontrada</h1>");
      });
    return;
  }

  res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
  res.end("<h1>Recurso no encontrado</h1>");
};

const server = http.createServer(processRequest);

server.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
