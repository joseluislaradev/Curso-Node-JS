// process es un objeto global que brinda informacion y control sobre el proceso actual de Node.js
// Permite acceder a argumentos, variables de entorno, y controlar la salida del proceso
const process = require("node:process");

// Ejemplo de uso
console.log("Argumentos del proceso:", process.argv);
console.log("Variables de entorno:", process.env);

//CWD (Current Working Directory) devuelve el directorio de trabajo actual, desde donde se ejecuta el script no donde esta el script
console.log("Directorio de trabajo actual:", process.cwd());

//environment variables
console.log("Variable de entorno PATH:", process.env.PATH);
console.log("Variable de entorno HOME:", process.env.PEPITO); // La variabel global inventada de la pasamos antes de ejecutar el script como PEPITO = HOLA NODE 7.PROCESS.JS

//controla la salida del proceso
process.exit(0); // 0 indica que el proceso finalizó correctamente, 1 indica un error

//controlar eventos del proceso
process.on("exit", (code) => {
  console.log(
    `El proceso está a punto de finalizar con código de salida: ${code}`
  );
});
