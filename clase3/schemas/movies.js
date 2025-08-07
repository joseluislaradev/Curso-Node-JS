const z = require("zod"); //Zod es una libreria de validacion de datos, se usa para validar los datos que recibimos en las peticiones y asegurarnos de que cumplen con un esquema definido.

//Validacion de datos con Zod
const peliculaSchema = z.object({
  title: z.string().min(1, "El titulo es obligatorio"),
  genre: z.array(
    z.enum([
      "Action",
      "Comedy",
      "Drama",
      "Horror",
      "Sci-Fi",
      "Romance",
      "Adventure",
      "Crime",
      "Science Fiction",
      "Fantasy",
      "Biography",
    ]),
    {
      required_error: "El género es obligatorio",
      invalid_type_error: "El género debe ser un array de strings",
    }
  ),
  year: z
    .number()
    .int()
    .min(1888, "El año debe ser un número entero mayor a 1888"),
  director: z.string().min(1, "El director es obligatorio"),
  rate: z
    .number()
    .min(0, "La calificación debe ser un número mayor o igual a 0")
    .max(10, "La calificación debe ser un número menor o igual a 10"),
  poster: z.url("El poster debe ser una URL válida"),
  duration: z
    .number()
    .int()
    .min(1, "La duración debe ser un número entero mayor a 0"),
});

function validarPelicula(object) {
  return peliculaSchema.safeParse(object); //safeParse devuelve un objeto con success y data o error, si es correcto devuelve success: true y data con los datos validados, si no es correcto devuelve success: false y error con los errores de validación.
}

module.exports = {
  validarPelicula,
};
