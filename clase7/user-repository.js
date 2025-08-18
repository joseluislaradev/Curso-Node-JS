import dbLocal from "db-local";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
const { Schema } = new dbLocal({ path: "./db" });

const User = Schema("User", {
  id: String,
  username: String,
  password: String,
});

export class UserRepository {
  static async create({ username, password }) {
    if (await User.findOne({ username })) {
      throw new Error("Usuario ya existe");
    }

    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10); //el segundo parametor es salt que significa cuantas vueltas se le dara al hash para crearlo, entre mas grade mas tarda

    const user = User.create({ _id: id, username, password: hashedPassword });
    await user.save();
    return id;
  }

  static async login({ username, password }) {
    const user = await User.findOne({ username });
    if (!user) throw new Error("Usuario no encontrado");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Contraseña incorrecta");

    return user;
  }

  //Una cookie es un poco mas segura que localstorage y sessionstorage porque es menos vulnerable a ataques XSS (Cross-Site Scripting ) ya que tiene una medida de seguridad llamada httpONly
  //que solo sea accesible por un servidor y entonces cuando nos inyectan codigo js no se puede.
  //Las cookies se pueden configurar para uqe se envien solo por hhtps y nadie la intercepten
  // ademas podemos hacer que las cookies solo se envien a dominios que sean los nuestros
}
