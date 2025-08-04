//Para hacerlo con promesas y no callbacks, estonces lo pone cuando se resuelve
const fsPromises = require("node:fs/promises");

console.log("Leyendo el primer archivo...");

fsPromises
  .readFile("./file.txt", "utf-8")
  .then((text1) => {
    console.log("Primer archivo: ", text1);
  })
  .catch((err) => {
    console.error("Error al leer el archivo:", err);
  });

console.log("Leyendo el segundo archivo...");

fsPromises
  .readFile("./file2.text", "utf-8")
  .then((text2) => {
    console.log("Segundo archivo: ", text2);
  })
  .catch((err) => {
    console.error("Error al leer el archivo:", err);
  });
