
import { Users } from "./Users";

export interface UsersRepository {
  getAll(): Promise<Users[] | null>;
  getById(userId: string): Promise<Users | null>;
  createUsers(
    nombre: string,
    correo: string,
    password: string
  ): Promise<Users | null>;
  login(
    correo: string,
    password: string
  ): Promise<Users | null>;
  deleteUser(userId: string): Promise<boolean>;
  updateUsers(
    userId: string,
    nombre?: string,
    correo?: string,
    password?: string
  ): Promise<Users | null>;


  getByEmail(correo: string): Promise<Users | null>;
}
