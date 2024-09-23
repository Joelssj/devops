import { UsersRepository } from "../domain/UsersRepository";

export class DeleteUsersUseCase {
    constructor(readonly usersRepository: UsersRepository) {}

    async run(userId: string): Promise<boolean> {
        try {
            const result = await this.usersRepository.deleteUser(userId);
            return result;   
        } catch (error) {
            return false;  
        }
    }
}
