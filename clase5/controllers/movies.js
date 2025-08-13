import { validarPelicula, validarParcialPelicula } from "../schemas/movies.js"; //Importamos la funcion de validacion de peliculas

const ACCEPT_ORIGINS = ["http://localhost:8080", "http://localhost:3000"];

export class MovieController {
  constructor({ PeliculaModel }) {
    this.peliculaModel = PeliculaModel;
  }

  getAll = async (req, res) => {
    if (ACCEPT_ORIGINS.includes(req.headers.origin) || !req.headers.origin) {
      res.header("Access-Control-Allow-Origin", req.headers.origin);
    }

    let { genre, page } = req.query;

    page ? page : (page = 1);

    const pagina = parseInt(page);
    const inicio = (pagina - 1) * 5;
    const fin = inicio + 5;
    const peliculas = await this.peliculaModel.getAll({ inicio, fin, genre });

    //Para lo de representar se puede leer como venia y mandarlo con ese formato, aunque eso ya es muy raro
    return res.json(peliculas);
  };

  getById = async (req, res) => {
    //se puede usar path to regex para validar el id
    const { id } = req.params;
    const pelicula = await this.peliculaModel.getById(id); //Debbemo siempe ahcer nuestor modelo asincrono, porque aunque trabajemos con sincrono por dentro desde aca no deberiamos savberlo como trabaj, solo sabemos que nos devuelve una promesa
    if (pelicula) {
      res.json(pelicula);
    } else {
      res.status(404).send("Pelicula no encontrada");
    }
  };

  create = async (req, res) => {
    const resultado = validarPelicula(req.body);
    if (resultado.error) {
      return res.status(422).json(JSON.parse(resultado.error));
    }

    const nuevaPelicula = await this.peliculaModel.create(resultado.data);

    res.status(201).json(nuevaPelicula); //201 es el codigo de creado, se suele responder con el recurso creado para actualizar cache del cliente en la misma peticion puesto que ya llega con id.
  };

  editar = async (req, res) => {
    const { id } = req.params;
    const result = validarParcialPelicula(req.body);
    if (result.error) {
      return res.status(422).json(JSON.parse(result.error));
    }

    const peliculaActualizada = await this.peliculaModel.editar(
      id,
      result.data
    );

    res.json(peliculaActualizada);
  };

  eliminar = async (req, res) => {
    if (ACCEPT_ORIGINS.includes(req.headers.origin) || !req.headers.origin) {
      res.header("Access-Control-Allow-Origin", req.headers.origin);
    }
    const { id } = req.params;
    const peliculaEliminada = await this.peliculaModel.eliminar(id);

    res.json(peliculaEliminada);
  };

  options = async (req, res) => {
    if (ACCEPT_ORIGINS.includes(req.headers.origin) || !req.headers.origin) {
      //Encabezados para permitir el acceso desde el origen especificado
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      //Encabezados para permitir los metodos y encabezados que se pueden usar en la peticion
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
      );
      //Encabezados para permitir los encabezados que se pueden usar en la peticion
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
    res.status(204).send(); //204 No Content, no hay contenido que devolver
  };
}
