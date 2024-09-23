import { CreateUsersUseCase } from "../../../application/CreateUsersUseCase";
import { GetByIdUsersUseCase } from "../../../application/GetByIdUsersUseCase";
import { GetAllUsersUseCase } from "../../../application/GetAllUsersUseCase";
import { LoginUseCase } from "../../../application/LoginUseCase";
import { DeleteUsersUseCase } from "../../../application/DeleteUserCase"; 
import { CreateUsersController } from "../controllers/CreateUsersController";
import { GetAllUsersController } from "../controllers/GetAllUsersController";
import { GetByIdUsersController } from "../controllers/GetByIdUsersController";
import { LoginController } from "../controllers/LoginController";
import { DeleteUsersController } from "../controllers/DeleteUserController"; 
import { UpdateUsersController } from "../controllers/UpdateUsersControllers";
import { UpdateUsersUseCase } from "../../../application/UpdateUsersCaseUse";
import { MysqlUsersRepository } from "../../adapters/MysqlUsersRepository";

export const usersRepository = new MysqlUsersRepository();


export const createUserUseCase = new CreateUsersUseCase(usersRepository);
export const getAllUseCase = new GetAllUsersUseCase(usersRepository);
export const getByIdUserUseCase = new GetByIdUsersUseCase(usersRepository);
export const loginUseCase = new LoginUseCase(usersRepository);
export const deleteUserUseCase = new DeleteUsersUseCase(usersRepository); 
export const updateUserUseCase = new UpdateUsersUseCase(usersRepository); 

export const createUserController = new CreateUsersController(createUserUseCase);
export const getAllController = new GetAllUsersController(getAllUseCase);
export const getByIdUserController = new GetByIdUsersController(getByIdUserUseCase);
export const loginController = new LoginController(loginUseCase);
export const deleteUserController = new DeleteUsersController(deleteUserUseCase); 
export const updateUserController = new UpdateUsersController(updateUserUseCase);