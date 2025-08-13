import router from "express";
import { MovieController } from "../controllers/movies.js";

export function peliculaModel({ PeliculaModel }) {
  const moviesRouter = router();

  const movieController = new MovieController({ PeliculaModel });

  moviesRouter.get("/", movieController.getAll);

  moviesRouter.get("/:id", movieController.getById);

  moviesRouter.post("/", movieController.create);

  moviesRouter.patch("/:id", movieController.editar);

  moviesRouter.delete("/:id", movieController.eliminar);

  moviesRouter.options("/:id", movieController.options);

  return moviesRouter;
}
