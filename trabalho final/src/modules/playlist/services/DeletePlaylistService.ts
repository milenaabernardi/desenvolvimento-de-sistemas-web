import { getCustomRepository } from "typeorm";
import PlaylistsRepository from "../typeorm/repositories/PlaylistsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id:string;

}
export default class DeletePlaylistService{
    public async execute({id}:IRequest):Promise<void>{
        const playlistRepo = getCustomRepository(PlaylistsRepository);
        const playlist = await playlistRepo.findById(id);
        if(!playlist){
            throw new AppError('Playlist não encontrada');
        }
        
        await playlistRepo.remove(playlist);
    }
}