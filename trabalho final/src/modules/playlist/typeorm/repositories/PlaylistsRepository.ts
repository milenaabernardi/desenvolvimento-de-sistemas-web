import { EntityRepository, Repository } from "typeorm";
import Playlist from "../entities/Playlist";

@EntityRepository(Playlist)
export default class PlaylistsRepository extends Repository<Playlist> {
    public async findByName(nome: string): Promise<Playlist | undefined> {
        const playlist = this.findOne({
            where: { nome }
        });
        return playlist;
    }
    public async findById(id: string): Promise<Playlist | undefined> {
        const playlist = this.findOne({
            where: { id }
        });
        return playlist;
    }
    public async findAllByCriador(criador: string): Promise<Playlist[] | undefined> {
        const playlists = await this.find({
            where: { criador }
        });
        return playlists;
    }
}