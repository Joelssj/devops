import { Users } from "../domain/Users";
import { UsersRepository } from "../domain/UsersRepository";

export class CreateUsersUseCase {
  constructor(readonly usersRepository: UsersRepository) {}

  async run(
    nombre: string,
    correo: string,
    password: string
  ): Promise<Users | null> {
    // Verificar si el correo ya está registrado
    const existingUser = await this.usersRepository.getByEmail(correo);
    if (existingUser) {
      throw new Error("El correo ya está registrado");
    }

    // Validar la contraseña (mínimo 8 caracteres, con al menos un número y un símbolo)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error("La contraseña debe tener al menos 8 caracteres, incluir un número y un símbolo");
    }

    // Crear el usuario si pasa las validaciones
    try {
      const user = await this.usersRepository.createUsers(nombre, correo, password);
      return user;
    } catch (error) {
      // Propagar el error si ocurre un problema al crear el usuario
      throw new Error("Error al crear el usuario");
    }
  }
}
