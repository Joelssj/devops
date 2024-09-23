import { Request, Response } from "express";
import { CreateUsersUseCase } from "../../../application/CreateUsersUseCase";

export class CreateUsersController {
  constructor (readonly createUserUseCase: CreateUsersUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;

    try {
      const user = await this.createUserUseCase.run(
        data.nombre,
        data.correo,
        data.password
      );

      if (user) {
        res.status(201).send({
          status: "success",
          data: {
            id: user.id,
            nombre: user.nombre,
            correo: user.correo,
            password: user.password
          }
        });
      } else {

        res.status(400).send({
          status: "Error de registro",
          data: "No fue posible agregar el registro",
        });
      }
    } catch (error) {

      res.status(500).send({
        status: "Error",
        data: "Ha ocurrido un error",
        msn: (error instanceof Error) ? error.message : "Error desconocido"
      });
    }
  }
}
