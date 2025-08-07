const fs = require("node:fs/promises");
const path = require("node:path");
const pc = require("picocolors");

folder = process.argv[2] ?? "./";

async function listFiles(folder) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch (error) {
    console.error("Error al leer el directorio:", error);
    process.exit(1);
  }

  const filesPromises = files.map(async (file) => {
    // Los mapeos con async siempre retornan una promesa
    //Los mapeos ocurren en paralelo, no en secuencia. En secuncia es el forEach.
    const filePath = path.join(folder, file);
    let stats;

    try {
      stats = await fs.stat(filePath);
    } catch (error) {
      console.error(pc.red("Error al obtener información del archivo:", error));
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();
    const type = isDirectory ? "D" : "A";
    const size = isDirectory ? "N/A" : `${stats.size} bytes`;
    const fileModified = stats.mtime.toLocaleString();

    return `${pc.white(type.padEnd(10))} ${pc.blue(file.padEnd(30))} ${pc.green(
      size.padStart(10)
    )} ${pc.yellow(fileModified)}`;
  });

  filesInfo = await Promise.all(filesPromises);

  filesInfo.sort((a, b) => b.localeCompare(a));

  filesInfo.unshift(
    "Tipo      Nombre                          Tamaño     Modificado"
  );

  filesInfo.forEach((fileInfo) => {
    console.log(fileInfo);
  });
  console.log(`\nTotal archivos: ${filesInfo.length}`);
}

listFiles(folder);
