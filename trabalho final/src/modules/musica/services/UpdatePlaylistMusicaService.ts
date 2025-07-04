import { getCustomRepository } from "typeorm"
import MusicasRepository from "../typeorm/repositories/MusicasRepository"
import PlaylistsRepository from "@modules/playlist/typeorm/repositories/PlaylistsRepository";
import AppError from "@shared/errors/AppError";
import Musica from "../typeorm/entities/Musica";

interface IRequest {
    id: string
    playlist_id: string
}

export default class UpdatePlaylistMusicaService {
    public async execute({ id, playlist_id }: IRequest): Promise<Musica> {
        const musicaRepo = getCustomRepository(MusicasRepository);
        const playlistRepo = getCustomRepository(PlaylistsRepository);

        const musica = await musicaRepo.findById(id);
        if (!musica) {
            throw new AppError("Musica não encontrada");
        }

        const playlist = await playlistRepo.findById(playlist_id);
        if (!playlist) {
            throw new AppError('Playlist não encontrada');
        }

        musica.playlist = playlist
        musica.playlist_id = playlist_id;

        await musicaRepo.save(musica);

        return musica;
    }
}