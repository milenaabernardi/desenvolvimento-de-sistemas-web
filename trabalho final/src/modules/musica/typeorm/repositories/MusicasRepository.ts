import { EntityRepository, Repository } from "typeorm";
import Musica from "../entities/Musica";


@EntityRepository(Musica)
export default class MusicasRepository extends Repository<Musica> {
    public async findById(id: string): Promise<Musica | undefined> {
        const musica = await this.findOne({
            where: {id}
        })

        return musica;
    }
    public async findByArtist(artista: string): Promise<Musica[] | undefined> {
        const musicas = await this.find({
            where: {artista}
        })

        return musicas;
    }
}