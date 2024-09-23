import express from "express";
import { createUserController, deleteUserController, getAllController} from "../dependencies/dependencies";
import { loginController } from "../dependencies/dependencies";
import { getByIdUserController } from "../dependencies/dependencies";
import { updateUserController } from "../dependencies/dependencies";

export const usersRouter = express.Router();

usersRouter.post( "/crear", createUserController.run.bind(createUserController));
usersRouter.post( "/login",loginController.run.bind(loginController));
usersRouter.get("/get/:id",getByIdUserController.run.bind(getByIdUserController));
usersRouter.get("/get",getAllController.run.bind(getAllController));
usersRouter.delete("/delete/:id",deleteUserController.run.bind(deleteUserController));
usersRouter.put("/update/:id",updateUserController.run.bind(updateUserController));
