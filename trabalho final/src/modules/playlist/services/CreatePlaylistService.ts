import { getCustomRepository } from "typeorm";
import PlaylistsRepository from "../typeorm/repositories/PlaylistsRepository";
import AppError from "@shared/errors/AppError";
import Playlist from "../typeorm/entities/Playlist";

interface IRequest {
    nome: string;
    criador: string;
    genero: string;
    duracao_total: string;
    descricao: string;
}

export default class CreatePlaylistService {
    public async execute({ nome, criador, genero, duracao_total, descricao }: IRequest): Promise<Playlist> {
        const playlistRepo = getCustomRepository(PlaylistsRepository);
        const playlistExist = await playlistRepo.findByName(nome);
        if (playlistExist && playlistExist.criador == criador) {
            throw new AppError("Você já tem uma playlist criada com esse mesmo nome");
        }
        const playlist = await playlistRepo.create({ nome, criador, genero, duracao_total, descricao });
        await playlistRepo.save(playlist);

        return playlist;
    }
}