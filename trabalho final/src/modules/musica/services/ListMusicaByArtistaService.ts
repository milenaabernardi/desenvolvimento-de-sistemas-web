import { getCustomRepository } from "typeorm";
import MusicasRepository from "../typeorm/repositories/MusicasRepository";
import Musica from "../typeorm/entities/Musica";
import AppError from "@shared/errors/AppError";
import PlaylistsRepository from "@modules/playlist/typeorm/repositories/PlaylistsRepository";

interface IRequest {
    artista: string;
}
export default class ListMusicaByArtistaService {
    public async execute({ artista }: IRequest): Promise<Musica[]> {
        const musicaRepo = getCustomRepository(MusicasRepository);
        const musicas = await musicaRepo.findByArtist(artista);
        const playlistRepo = getCustomRepository(PlaylistsRepository)

        if (!musicas) {
            throw new AppError("Artista não encontrado")
        }

        for (const musica of musicas) {
            if (musica.playlist_id) {
                musica.playlist = await playlistRepo.findById(musica.playlist_id);
            }
        }

        return musicas;
    }
}