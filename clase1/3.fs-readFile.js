const fs = require("node:fs");

console.log(fs);

//Esto es sincrono, bloquea el hilo de ejecución
console.log("Leyendo el primer archivo...");
const text = fs.readFileSync("./file.txt", "utf-8"); // Devuelve buffer de memeoria, con utf-8 lo convierte a texto
console.log("Primer archivo: ", text);

console.log("Hacer cosas mientras lee el archivo...");

console.log("-".repeat(20));

//Esto es asincrono, no bloquea el hilo de ejecución
console.log("Leyendo el segundo archivo...");
fs.readFile("./file2.text", "utf-8", (err, text2) => {
  //Utilizan callbacks como 3er parametro que se ejecutan una vez la tarea de termina pero entonces lo demas sigue
  if (err) {
    console.error("Error al leer el archivo:", err);
    return;
  }
  console.log("Segundo archivo: ", text2);
});

console.log("Hacer cosas mientras lee el archivo 2...");
