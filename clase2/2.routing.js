const http = require("node:http");

puerto = process.env.puerto || 3000;

const dittoJson = require("./ditto.json");

const processRequest = (req, res) => {
  const { url, method } = req;

  switch (method) {
    case "GET":
      switch (url) {
        case "/pokemon/ditto":
          res.writeHead(200, { "Content-Type": "application/json" });
          return res.end(JSON.stringify(dittoJson));
        default:
          res.writeHead(404, { "Content-Type": "application/html" });
          return res.end("<h1>Página no encontrada</h1>");
      }
    case "POST":
      switch (url) {
        case "/pokemon":
          let body = "";
          //escucahr el evento data
          req.on("data", (chunk) => {
            //nos van llegando los datos en partes, por eso usamos el evento data u suamos res.on para escuchar los datos que nos envian constantemente

            //convertir el buffer a string porque nos llega en binario y juntamos sus partes
            body += chunk.toString(); //CHunk es un buffer que contiene los datos que nos envian pero entoncs como es buffer estan en binario
          });
          req.on("end", () => {
            const pokemon = JSON.parse(body);
            console.log("Pokemon recibido:", pokemon);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(pokemon));
          });
          break;
        default:
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end("<h1>Página no encontrada</h1>");
      }
      break;
    default:
      res.writeHead(405, { "Content-Type": "text/html; charset=utf-8" });
      return res.end("<h1>Método no permitido</h1>");
  }
};

const server = http.createServer(processRequest);

server.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`);
});
