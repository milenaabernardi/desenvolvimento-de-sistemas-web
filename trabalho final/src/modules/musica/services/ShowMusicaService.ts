import { getCustomRepository } from "typeorm"
import MusicasRepository from "../typeorm/repositories/MusicasRepository"
import Musica from "../typeorm/entities/Musica";
import PlaylistsRepository from "@modules/playlist/typeorm/repositories/PlaylistsRepository";

interface IRequest {
    id: string
}
export default class ShowMusicaService {
    public async execute({ id }: IRequest): Promise<Musica> {
        const musicaRepo = getCustomRepository(MusicasRepository);
        const musica = await musicaRepo.findById(id);

        const playlistRepo = getCustomRepository(PlaylistsRepository);
        if(musica.playlist_id){
            musica.playlist = await playlistRepo.findById(musica.playlist_id);
        }
        
        return musica
    }
}