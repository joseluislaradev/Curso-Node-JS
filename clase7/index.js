import express from "express";
import { UserRepository } from "./user-repository.js";
import cookieParser from "cookie-parser";

const app = express();

const puerto = process.env.PORT ?? 3000;

app.set("view engine", "ejs"); // Indicamos que usaremos ejs como motor de plantillas
app.use(express.json());
app.use(cookieParser()); //Hace que las cookies ahora se vayan pegada en las peticiones
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send("No autorizado");
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data;
  } catch (error) {
    return res.status(401).send("No autorizado");
  }

  next();
});

app.get("/", (req, res) => {
  return res.render("example.ejs", { name: "JUan" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserRepository.login({ username, password });
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true, //para que la cookie solo pueda verse en el servidor,no con js
      secure: process.env.NODE_ENV === "production", //solo se envie por https
      sameSite: "Strict", //para que la cookie solo se envie a nuestro dominio
      maxAge: 3600000,
    }); //httpOnly es que la cookie solo puede verse en el servidor,no con js, secure es para que solo se envie por https (solo si estamos en produccion)
    return res.send(user);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "error en el servidor", details: error.message });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ error: "Faltan datos" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error en el servidor" });
  }

  try {
    const id = await UserRepository.create({ username, password });
    res.status(201).send({ id });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error en el servidor", details: error.message });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.send("Logout exitoso");
});

app.get("/rutaProtegida", (req, res) => {
  return res.render("protected.ejs", { name: req.user.username });
});

app.listen(puerto, () => {
  console.log(`Servidor corriendo en: http://www.localhost:${puerto}`);
});
