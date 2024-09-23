import { Request, Response } from "express";
import { DeleteUsersUseCase } from "../../../application/DeleteUserCase";

export class DeleteUsersController {
    constructor(readonly deleteUserUseCase: DeleteUsersUseCase) {}

    async run(req: Request, res: Response) {
        const userId = req.params.id;
        try {
            const result = await this.deleteUserUseCase.run(userId);
            if (result) {
                res.status(200).send({
                    status: "success",
                    data: `El usuario con id:${userId} ha sido eliminado.`,
                });
            } else {
                res.status(404).send({
                    status: "Error",
                    data: `User with ID ${userId} not found.`,
                });
            }
        } catch (error) {
            const errorMessage = (error as Error).message || "Unknown error";
            res.status(500).send({
                status: "Error",
                data: "An error occurred while trying to delete the user.",
                message: errorMessage,
            });
        }
    }
}