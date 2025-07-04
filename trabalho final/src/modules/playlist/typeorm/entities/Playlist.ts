import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("playlists")
export default class Playlist {
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column()
    nome: string
    @Column()
    criador: string
    @Column()
    genero: string
    @Column()
    duracao_total: string
    @Column()
    descricao: string;
    @CreateDateColumn()
    created_at: Date
    @UpdateDateColumn()
    updated_at: Date
}