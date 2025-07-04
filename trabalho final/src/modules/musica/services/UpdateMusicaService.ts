import { getCustomRepository } from "typeorm";
import Musica from "../typeorm/entities/Musica";
import MusicasRepository from "../typeorm/repositories/MusicasRepository";
import AppError from "@shared/errors/AppError";
import PlaylistsRepository from "@modules/playlist/typeorm/repositories/PlaylistsRepository";

interface IRequest {
    id: string;
    playlist_id?: string
    titulo: string
    artista: string
    duracao: string
    genero: string
    ano_lancamento: number
}
export default class UpdateMusicaService {
    public async execute({
        id, playlist_id, titulo, artista, duracao, genero, ano_lancamento
    }: IRequest): Promise<Musica> {
        const musicaRepo = getCustomRepository(MusicasRepository);
        const playlistRepo = getCustomRepository(PlaylistsRepository);

        const musica = await musicaRepo.findById(id);
        if (!musica) {
            throw new AppError("Música não encontrada");
        }

        if (playlist_id) {
            const playlist = await playlistRepo.findById(playlist_id);
            if (!playlist) {
                throw new AppError("Playlist não encontrada");
            }
            musica.playlist_id = playlist_id;
            musica.playlist = playlist;
        } else {
            musica.playlist_id = null;
            musica.playlist = null;
        }

        musica.titulo = titulo
        musica.artista = artista
        musica.duracao = duracao
        musica.genero = genero
        musica.ano_lancamento = ano_lancamento;

        await musicaRepo.save(musica);

        return musica
    }
}