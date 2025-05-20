import UsersRepository from "@modules/users/typeorm/repositories/UserRepository";
import AppError from "@shared/http/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { hash } from "bcryptjs";
import { compare } from "bcryptjs";

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}

export default class CreateUserService {
    public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findById(user_id);
        if (!user) {
            throw new AppError('User not found.');
        }
        const userUptadeEmail = await userRepository.findByEmail(email);
        if (userUptadeEmail && userUptadeEmail.id !== user.id) {
            throw new AppError('There is already one user with this email');
        }
        if (password && !old_password) {
            throw new AppError('Old password is required');
        }
        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);
            if (!checkOldPassword) {
                throw new AppError('Old password does not match');
            }
            user.password = await hash(password, 8);
        }
        user.name = name;
        user.email = email;
        await userRepository.save(user);
        return user;
    }
}