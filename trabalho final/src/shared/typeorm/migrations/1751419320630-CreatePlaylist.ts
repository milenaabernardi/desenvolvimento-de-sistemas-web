import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePlaylist1751419320630 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "playlists",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()"
                    },
                    { name: "nome", type: "varchar" },
                    { name: "criador", type: "varchar" },
                    { name: "genero", type: "varchar" },
                    { name: "duracao_total", type: "time" },
                    { name: "descricao", type: "text" },
                    { name: "created_at", type: "timestamp", default: "now()" },
                    { name: "updated_at", type: "timestamp", default: "now()" },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('playlists');
    }

}
