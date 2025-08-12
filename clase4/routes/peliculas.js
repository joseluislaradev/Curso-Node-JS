import router from "express";
import { MovieController } from "../controllers/movies.js";

export const moviesRouter = router();

moviesRouter.get("/", MovieController.getAll);

moviesRouter.get("/:id", MovieController.getById);

moviesRouter.post("/", MovieController.create);

moviesRouter.patch("/:id", MovieController.editar);

moviesRouter.delete("/:id", MovieController.eliminar);

moviesRouter.options("/:id", MovieController.options);
