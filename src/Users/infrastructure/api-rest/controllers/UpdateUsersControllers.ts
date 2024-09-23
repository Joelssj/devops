import { Request, Response } from "express";
import { UpdateUsersUseCase } from "../../../application/UpdateUsersCaseUse";

export class UpdateUsersController {
    constructor(readonly updateUsersUseCase: UpdateUsersUseCase) {}

    async run(req: Request, res: Response) {
        const { id } = req.params;
        const data = req.body;

        try {
            const user = await this.updateUsersUseCase.run(
                id,
                data.nombre,
                data.correo,
                data.password
            );

            if (user) {
                res.status(200).send({
                    status: "success",
                    data: {
                        id: user.id,
                        nombre: user.nombre,
                        correo: user.correo,
                        password: user.password
                    }
                });
            } else {
                res.status(404).send({
                    status: "User not found",
                    data: "No fue posible actualizar el registro"
                });
            }
        } catch (error) {
            res.status(500).send({
                status: "Error",
                data: "Ha ocurrido un error",
                msn: (error as Error).message
            });
        }
    }
}
