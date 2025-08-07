//MOdulos nativos de node

const os = require("node:os"); //Modulo de sistema operativo

console.log("Información del sistema operativo:");
console.log("-----------------------------------");
console.log("Plataforma:", os.platform());
console.log("Arquitectura:", os.arch());
console.log("Memoria total:", os.totalmem() / (1024 * 1024), "MB");
console.log("Memoria libre:", os.freemem() / (1024 * 1024), "MB");
console.log("CPU:", os.cpus());
console.log("Redes:", os.networkInterfaces());
console.log("Memoria libre:", os.freemem() / (1024 * 1024), "MB");
console.log("Memoria total:", os.totalmem() / (1024 * 1024), "MB");
console.log("uptime:", os.uptime() / 60 / 60, "horas");
