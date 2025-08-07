// Para utilizar async - await no se puede en CommonJS no lo soporta, se debe usar en modulos ES6 que son tipos de modulos que si lo hacen
const { readFile } = require("node:fs/promises");

//IIFE - Inmediately Invoked Function Expression: es una funcion que se ejecuta sola apaenas se crea
(async () => {
  console.log("Leyendo el primer archivo...");
  const text = await readFile("./file.txt", "utf-8");
  console.log("Primer archivo: ", text);

  console.log("Leyendo el segundo archivo...");
  const text2 = await readFile("./file2.text", "utf-8");
  console.log("Segundo archivo: ", text2);
})();

//Hay 3 cosas
//sincrono: bloquea el hilo de ejecución, se ejecuta una vez que termina la tarea
//asincrono secuencial: no bloquea el hilo de ejecución, se ejecuta una vez que termina la tarea
//asincrono paralelo: se ejecuta al mismo tiempo que otras tareas, no espera a que termine la tarea

// asincrono secuencial parece lo mismo que sincrono pero no lo es porque libera recursos ya que no se queda pillado, se libera el proceso y aunque tenga que esperar ya no hace nada,
// en sincrono se queda pillado con el proceso y no libera recursos, por eso es mejor asincrono secuencial
// asincrono paralelo es mejor porque se ejecutan al mismo tiempo y no espera a que termine la tarea, por eso es mas rapido
