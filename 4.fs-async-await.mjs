// Para utilizar async - await no se puede en CommonJS no lo soporta, se debe usar en modulos ES6 que son tipos de modulos que si lo hacen
import { readFile } from "node:fs/promises";

console.log("Leyendo el primer archivo...");

const text = await readFile("./file.txt", "utf-8");
console.log("Primer archivo: ", text);

console.log("Leyendo el segundo archivo...");

const text2 = await readFile("./file2.text", "utf-8");
console.log("Segundo archivo: ", text2);
