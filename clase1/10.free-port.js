const net = require("node:net"); // Permite trabajar con sockets TCP, crear servidores y clientes TCP, es mas rapido que http porque no tiene que parsear las peticiones y respuestas HTTP

function findFreePort(port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();

    server.listen(port, () => {
      const { port } = server.address();
      server.close(() => {
        resolve(port); // Si el puerto está libre, resolvemos la promesa con el puerto
      });
    });

    //NodeJs esta gestionado con eventos por eso podemos escuchar muchos eventos como el de error
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        findFreePort(0).then((port) => resolve(port)); // Si el puerto está en uso, buscamos un puerto libre
      } else {
        reject(err); // Si ocurre otro error, rechazamos la promesa
      }
    });
  });
}

module.exports = { findFreePort };
