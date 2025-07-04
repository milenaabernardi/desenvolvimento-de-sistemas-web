import { getCustomRepository } from "typeorm";
import Musica from "../typeorm/entities/Musica";
import MusicasRepository from "../typeorm/repositories/MusicasRepository";
import PlaylistsRepository from "@modules/playlist/typeorm/repositories/PlaylistsRepository";

export default class ListMusicaService {
    public async execute(): Promise<Musica[]> {
        const musicaRepo = getCustomRepository(MusicasRepository);
        const playlistRepo = getCustomRepository(PlaylistsRepository);
        const musicas = await musicaRepo.find()
        for (const musica of musicas) {
            if (musica.playlist_id) {
                musica.playlist = await playlistRepo.findById(musica.playlist_id);
            }
        }
        return musicas
    }
}