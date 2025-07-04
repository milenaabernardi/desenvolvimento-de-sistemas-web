import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UserRepository";
import User from "../typeorm/entities/User";

export default class ListUserService{

    public async execute() : Promise<User[]>{
        const userRepository = getCustomRepository(UsersRepository);
        const users = await userRepository.find();
        return users;
    }
}