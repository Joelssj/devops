import { Users } from "../domain/Users";
import { UsersRepository } from "../domain/UsersRepository";

export class UpdateUsersUseCase {
    constructor(readonly usersRepository: UsersRepository) {}

    async run(
        id: string,
        nombre?: string,
        correo?: string,
        password?: string
    ): Promise<Users | null> {
        try {
            const user = await this.usersRepository.updateUsers(
                id,
                nombre,
                correo,
                password
            );
            return user;
        } catch (error) {
            return null;
        }
    }
}
