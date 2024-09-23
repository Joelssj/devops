import { Request, Response } from "express";
import { GetByIdUsersUseCase } from "../../../application/GetByIdUsersUseCase";

export class GetByIdUsersController{
constructor(readonly getByIdUsersUseCase: GetByIdUsersUseCase){}

async run(req: Request, res: Response) {
    const id: string = req.params.id; 
    try {
      const user = await this.getByIdUsersUseCase.run(id);

      if (user)
        //Code HTTP : 200 -> Consulta exitosa
        res.status(200).send({
          status: "success",
          data: {
            id: user.id,
            nombre: user.nombre,
            correo: user.correo,
            password: user.password
          },
        });
      else
        res.status(400).send({
          status: "Error",
          msn: "Ha ocurrido un problema",
        });
    } catch (error) {
      //Code HTTP : 204 Sin contenido
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }

}