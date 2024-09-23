import { Users } from "../domain/Users";
import { UsersRepository } from "../domain/UsersRepository";

export class GetByIdUsersUseCase{
  constructor(readonly userReposiory: UsersRepository){}

  async run(id: string): Promise<Users | null> {
  try {
    const result = await this.userReposiory.getById(id);
    return result;
  } catch (error) {
    return null;
  } 
  }
}