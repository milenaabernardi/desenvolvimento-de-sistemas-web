import { getCustomRepository } from "typeorm";
import Playlist from "../typeorm/entities/Playlist";
import PlaylistsRepository from "../typeorm/repositories/PlaylistsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string,
    nome: string;
    criador: string;
    genero: string;
    duracao_total: string;
    descricao: string;
}

export default class UpdatePlaylistService {
    public async execute({
        id, nome, criador, genero, duracao_total, descricao
    }: IRequest): Promise<Playlist> {
        const playlistRepo = getCustomRepository(PlaylistsRepository);
        const playlist = await playlistRepo.findById(id);

        if (!playlist) {
            throw new AppError('Playlist não encontrada')
        }

        playlist.nome = nome
        playlist.criador = criador
        playlist.genero = genero
        playlist.duracao_total = duracao_total
        playlist.descricao = descricao

        await playlistRepo.save(playlist);

        return playlist;
    }
}