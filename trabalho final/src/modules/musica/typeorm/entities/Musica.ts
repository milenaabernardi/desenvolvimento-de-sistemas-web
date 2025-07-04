import Playlist from "@modules/playlist/typeorm/entities/Playlist";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("musicas")
export default class Musica {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @ManyToOne(() => Playlist)
  @JoinColumn({ name: "playlist_id" })
  playlist: Playlist;
  @Column()
  playlist_id: string;
  @Column()
  titulo: string;
  @Column()
  artista: string;
  @Column()
  duracao: string;
  @Column()
  genero: string;
  @Column()
  ano_lancamento: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
