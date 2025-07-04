import { getCustomRepository } from "typeorm";
import Playlist from "../typeorm/entities/Playlist";
import PlaylistsRepository from "../typeorm/repositories/PlaylistsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id:string
}
export default class ShowPlaylistService{
    public async execute({id}:IRequest):Promise<Playlist>{
        const playlistRepo = getCustomRepository(PlaylistsRepository);
        const playlist = await playlistRepo.findById(id);

        if(!playlist){
            throw new AppError("Playlist não encontrada")
        }

        return playlist;
    }
}