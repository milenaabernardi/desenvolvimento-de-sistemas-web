import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UserRepository";
import AppError from "@shared/http/errors/AppError";
import fs from "fs";
import path from "path";
import uploadConfig from '@config/upload';
import User from "../typeorm/entities/User";

interface IRequest{
    user_id: string;
    avatarFileName: string;
}
export default class UpdateUserAvatarService{

    public async execute({user_id, avatarFileName} : IRequest) : Promise<User>{
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(user_id);
        if(!user){
            throw new AppError('User not found.');
        }
        if(user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFileName;
        await usersRepository.save(user);
        return user;
    }
}