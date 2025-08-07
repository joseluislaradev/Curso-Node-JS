const path = require("node:path"); //Creamos rutas, recuepramos extenciones de archivos, etc.

//EN node no se debe usar / porque no es multiplataforma, entonces se usa el modulo path que es multiplataforma
//ESto es porque en windows se usa \ y en linux y mac se usa /, entonces path se encarga de poner el separador correcto

console.log(path.sep); //Nos dice como se separan las carpetas: \ en windows y / en linux y mac

//Unir rutas, path.join() une las rutas y pone el separador correcto
const filePath = path.join("content", "subfolder", "test.txt");
console.log(filePath); //content/subfolder/test.txt en linux y mac, content\sub

const base = path.basename(filePath); //Nos da el nombre del archivo, le podemos pasar segundo parametro para que nos quite la extencion
console.log(base); //test.txt

const extencion = path.extname(filePath); //Nos da la extencion del archivo
console.log(extencion); //.txt
