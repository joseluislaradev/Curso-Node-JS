import express from "express";
import morgan from "morgan"; //Es un paquete que es un logger, lleva la traza de la request dandonos informacion
import { Server } from "socket.io";
import { createServer } from "node:http";
import dotenv from "dotenv"; //Es un paquete que nos permite cargar las variables de entorno desde un archivo .env
import { createClient } from "@libsql/client";

dotenv.config(); // Cargamos las variables de entorno

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

await db.execute(
  `CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT, 
  content TEXT, 
  user TEXT,  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`
);

const puerto = process.env.PORT || 3000;

const app = express();
const server = createServer(app); //Creamos un servidor http con express
const io = new Server(server, {
  connectionStateRecovery: {
    maxAttempts: 5,
    timeout: 10000,
  }, //Esto es para la reconexion automatica, es decir, si un cliente se desconecta, intentara reconectarse automaticamente y los mensajes que lleguen en ese tiempo se guardaran
}); // Creamos una instancia de Socket.IO (IO significa IN-out como para indicar eque es bidireccioanal)

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado", socket.id); //Cada vez que un cliente se conecta
  socket.on("disconnect", () => {
    console.log("Cliente desconectado", socket.id); //Cada vez que un cliente se desconecta
  });
  socket.on("chat-message", async (msg) => {
    let result;
    try {
      result = await db.execute({
        sql: "INSERT INTO messages (content, user) VALUES (?, ?)",
        args: [msg, socket.handshake.auth.username],
      });
    } catch (e) {
      console.error("Error al guardar el mensaje en la base de datos", e);
      return;
    }

    socket.broadcast.emit(
      "chat-message",
      msg,
      result.lastInsertRowid.toString(),
      socket.handshake.auth.username
    );

    //socket.broadcast.emit("chat-message", msg); // Emitimos el mensaje a todos los clientes conectados excepto al que lo envió (broadcast)
    //io.emit("chat-message", msg); // Emitimos el mensaje a todos los clientes conectados incluyendo al que lo envió
  });

  if (!socket.recovered) {
    //si no recuperamos los mensajes sin conexion
    try {
      const results = await db.execute({
        sql: "SELECT * FROM messages WHERE id > ?",
        args: [socket.handshake.auth.serverOffset ?? 0], //El cliente nos pasa este offset del utlima mensaje donde se quedo
      });
      results.rows.forEach((row) => {
        //Recorremos los mensajes y los emitimos al cliente
        socket.emit("chat-message", row.content, row.id.toString(), row.user);
      });
    } catch {
      console.error("Error al recuperar los mensajes");
    }
  }
});

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  return res.sendFile(process.cwd() + "/client/index.html"); //process es la ruta actual(donde se esta ejecutando) ya nada mas la sacamos con la funcion cwd()
});

app.use((req, res) => {
  return res.status(404).send("<h1>Recurso no encontrado</h1>");
});

server.listen(puerto, () => {
  console.log(`Localhost corriendo en: http://localhost:${puerto}`);
});
