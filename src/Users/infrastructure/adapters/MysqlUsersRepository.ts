import bcrypt from "bcrypt";
import { Users } from "../../domain/Users";
import { query } from "../../../database/mysql/mysql";
import { UsersRepository } from "../../domain/UsersRepository";

export class MysqlUsersRepository implements UsersRepository {


  async login(correo: string, password: string): Promise<Users | null> {
    try {
      const sql = "SELECT * FROM users WHERE correo = ?";
      const params: any[] = [correo]; 
      const result: any = await query(sql, params);
      const user = result[0][0];

      if (user && await bcrypt.compare(password, user.password)) {

        return new Users(user.id, user.nombre, user.correo, user.password);
      }

      return null;  // Contraseña incorrecta o usuario no encontrado
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en login:", error.message);
        throw new Error("Error en el proceso de login");
      } else {
        console.error("Error desconocido en login");
        throw new Error("Error desconocido en el proceso de login");
      }
    }
  }

  // Crear un nuevo usuario con hasheo de contraseña
  async createUsers(
    nombre: string,
    correo: string,
    password: string
  ): Promise<Users | null> {
    try {
      // Verificar si el correo ya existe
      const existingUser = await this.getByEmail(correo);
      if (existingUser) {
        console.log("El correo ya está registrado:", correo);
        throw new Error("El correo ya está registrado");
      }

      // Validar longitud y fortaleza de la contraseña (mínimo 8 caracteres, con números y símbolos)
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        throw new Error("La contraseña debe tener al menos 8 caracteres, incluir un número y un símbolo");
      }

      // Hashear la contraseña antes de guardarla
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = "INSERT INTO users (nombre, correo, password) VALUES (?, ?, ?)";
      const params: any[] = [nombre, correo, hashedPassword];  // Guardar contraseña hasheada
      const [result]: any = await query(sql, params);
      console.log("Usuario creado con ID:", result.insertId);
      return new Users(result.insertId, nombre, correo, hashedPassword);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en createUsers:", error.message);
        throw new Error(error.message);
      } else {
        console.error("Error desconocido en createUsers");
        throw new Error("Error desconocido al crear usuario");
      }
    }
  }

  // Implementación de getByEmail
  async getByEmail(correo: string): Promise<Users | null> {
    try {
      const sql = "SELECT * FROM users WHERE correo = ?";
      const params: any[] = [correo];
      const [result]: any = await query(sql, params);

      if (result.length === 0) {
        console.log("No se encontró ningún usuario con el correo:", correo);
        return null;  
      }

      const user = result[0];
      console.log("Usuario encontrado:", user);
      return new Users(user.id, user.nombre, user.correo, user.password);
    } catch (error) {
      console.error("Error al obtener usuario por correo:", error);
      return null;
    }
  }

  // Obtener un usuario por su ID
  async getById(id: string): Promise<Users | null> {
    try {
      const sql = "SELECT * FROM users WHERE id=?";
      const params: any[] = [id];
      const result: any = await query(sql, params);
      const user = result[0][0];
      return user ? new Users(user.id, user.nombre, user.correo, user.password) : null;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en getById:", error.message);
        throw new Error("Error al obtener usuario");
      } else {
        console.error("Error desconocido en getById");
        throw new Error("Error desconocido al obtener usuario");
      }
    }
  }

  // Obtener todos los usuarios
  async getAll(): Promise<Users[] | null> {
    try {
      const sql = "SELECT * FROM users";
      const [data]: any = await query(sql, []);
      const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));
      return dataUsers.map(
        (user: any) =>
          new Users(user.id, user.nombre, user.correo, user.password)
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en getAll:", error.message);
        throw new Error("Error al obtener todos los usuarios");
      } else {
        console.error("Error desconocido en getAll");
        throw new Error("Error desconocido al obtener todos los usuarios");
      }
    }
  }

  // Eliminar un usuario por su ID
  async deleteUser(userId: string): Promise<boolean> {
    try {
      const sql = "DELETE FROM users WHERE id=?";
      const params: any[] = [userId];
      const [result]: any = await query(sql, params);
      return result.affectedRows > 0;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en deleteUser:", error.message);
        throw new Error("Error al eliminar el usuario");
      } else {
        console.error("Error desconocido en deleteUser");
        throw new Error("Error desconocido al eliminar usuario");
      }
    }
  }

  // Actualizar los datos de un usuario
  async updateUsers(id: string, nombre?: string, correo?: string, password?: string): Promise<Users | null> {
    try {
      const fieldsToUpdate: string[] = [];
      const params: any[] = [];

      if (nombre) {
        fieldsToUpdate.push("nombre = ?");
        params.push(nombre);
      }
      if (correo) {
        fieldsToUpdate.push("correo = ?");
        params.push(correo);
      }
      if (password) {
        // Validar fortaleza de la nueva contraseña si se proporciona
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
          throw new Error("La nueva contraseña debe tener al menos 8 caracteres, incluir un número y un símbolo");
        }

        fieldsToUpdate.push("password = ?");
        params.push(password);  // Guardar contraseña en texto plano
      }

      params.push(id);
      const sql = `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;

      const [result]: any = await query(sql, params);
      if (result.affectedRows === 0) return null;

      const updatedUser: any = await this.getById(id);
      return updatedUser;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error en updateUsers:", error.message);
        throw new Error("Error al actualizar el usuario");
      } else {
        console.error("Error desconocido en updateUsers");
        throw new Error("Error desconocido al actualizar usuario");
      }
    }
  }
}


