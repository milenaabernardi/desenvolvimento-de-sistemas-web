import AppError from "@shared/http/errors/AppError";
import UsersRepository from "../typeorm/repositories/UserRepository";
import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import User from "../typeorm/entities/User";

interface IRequest{
    email: string;
    password: string;
}

export default class CreateSessionsService{
    public async execute({email, password} : IRequest) : Promise<User>{
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findByEmail(email);
        if(!user){
            throw new AppError('Incorrect email/password combination.', 401);
        }
        const passwordConfirmed = await compare(password, user.password);
        if(!passwordConfirmed){
            throw new AppError('Incorrect email/password combination.', 401);
        }
        return user;
    }
}