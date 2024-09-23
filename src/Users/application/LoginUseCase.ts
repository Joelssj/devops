import { Users } from "../domain/Users";
import { UsersRepository } from "../domain/UsersRepository";

export class LoginUseCase{
    constructor(readonly usersReposotory: UsersRepository){}

    async run(
        nombre:string,
        correo:string,
        password:string
    ): Promise<Users | null> {
     try {
        const result = await this.usersReposotory.login(
            correo,
            password
        );
        return result;
     } catch (error) {
        return null;
     }
    }
}