//FS - File system
const fs = require("node:fs"); // Módulo de sistema de archivos, se puede poner solo fs pero no s recomienda se debe poner node: despuesd e su version 16 segun al documentación oficial

console.log("Información del sistema de archivos:");
console.log("-----------------------------------");
console.log("Sistema de archivos:", fs);
const stats = fs.statSync("./file.txt"); // Sincrono, bloquea el hilo de ejecución
console.log("Información del archivo:");
console.log("-----------------------------------");
console.log("Ruta:", stats);
console.log("Tamaño:", stats.size, "bytes");
console.log("Tipo:", stats.isFile() ? "Archivo" : "Directorio");
console.log("Fecha de creación:", stats.birthtime);
console.log("Fecha de modificación:", stats.mtime);
