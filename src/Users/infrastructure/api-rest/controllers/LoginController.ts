import { Request, Response } from "express";
import { LoginUseCase } from "../../../application/LoginUseCase";
import jwt from 'jsonwebtoken';

export class LoginController {
  constructor(readonly loginUseCase: LoginUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body
    try {
        const user = await this.loginUseCase.run(
            data.nombre,
            data.correo,
            data.password
        );
        if (user){
            const correo = user.correo
            const token = jwt.sign({ correo }, 'tu_secreto', { expiresIn: '1h' });
            res.status(200).send({
              status: "OK",
              token: token,
              msn: "El usuario o contraseña son correctos",
            });
        }
        else
            res.status(400).send({
                status: "Error",
                token: '',
                msn: "El usuario o contraseña estan incorectos",
            });
    } catch (error) {
      //Code HTTP : 204 Sin contenido
      res.status(204).send({
        status: "Error",
        data: "Ha ocurrido un error",
        msn: error,
      });
    }
  }
}