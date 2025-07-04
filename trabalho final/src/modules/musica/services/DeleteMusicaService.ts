import { getCustomRepository } from "typeorm";
import MusicasRepository from "../typeorm/repositories/MusicasRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id:string;
}

export default class DeleteMusicaService{
    public async execute({id}:IRequest){
        const musicaRepo = getCustomRepository(MusicasRepository);
        const musica = await musicaRepo.findById(id);

        if(!musica){
            throw new AppError("Música não encontrada")
        }

        await musicaRepo.remove(musica);
    }
}