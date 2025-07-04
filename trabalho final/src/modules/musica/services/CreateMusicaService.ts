import { getCustomRepository } from "typeorm";
import Musica from "../typeorm/entities/Musica";
import MusicasRepository from "../typeorm/repositories/MusicasRepository";
import PlaylistsRepository from "@modules/playlist/typeorm/repositories/PlaylistsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    playlist_id?: string;
    titulo: string;
    artista: string;
    duracao: string;
    genero: string;
    ano_lancamento: number;
}

export default class CreateMusicaService {
    public async execute({
        playlist_id,
        titulo,
        artista,
        duracao,
        genero,
        ano_lancamento,
    }: IRequest): Promise<Musica> {
        const musicaRepo = getCustomRepository(MusicasRepository);

        let playlist = null;

        if (playlist_id) {
            const playlistRepo = getCustomRepository(PlaylistsRepository);
            playlist = await playlistRepo.findById(playlist_id);

            if (!playlist) {
                throw new AppError("Playlist não encontrada");
            }
        }

        const musica = musicaRepo.create({
            playlist,
            playlist_id,
            titulo,
            artista,
            duracao,
            genero,
            ano_lancamento,
        });

        await musicaRepo.save(musica);

        return musica;
    }
}
