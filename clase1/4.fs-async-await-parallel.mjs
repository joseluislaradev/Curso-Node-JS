import { readFile } from "node:fs/promises";

// Leyendo archivos en paralelo con async/await
//Esto es mas rápido porque se hacen a la vez en paralelo no asinbcrono secuencial

Promise.all([
  readFile("./file.txt", "utf-8"),
  readFile("./file2.text", "utf-8"),
]).then(([text, text2]) => {
  console.log("Primer archivo: ", text);
  console.log("Segundo archivo: ", text2);
});
