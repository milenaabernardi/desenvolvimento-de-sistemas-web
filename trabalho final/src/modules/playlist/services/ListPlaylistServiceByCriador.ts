import { getCustomRepository } from "typeorm";
import Playlist from "../typeorm/entities/Playlist";
import PlaylistsRepository from "../typeorm/repositories/PlaylistsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    criador: string;
}

export default class ListPlaylistServiceByCriador {
    public async execute({ criador }: IRequest): Promise<Playlist[]> {
        const playlistRepo = getCustomRepository(PlaylistsRepository);
        const playlists = await playlistRepo.findAllByCriador(criador);
        if (!playlists) {
            throw new AppError("Não existe nenhuma playlist com esse criador")
        }
        return playlists;
    }
}