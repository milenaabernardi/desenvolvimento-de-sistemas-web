import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMusica1751511152183 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "musicas",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'titulo',
                        type: "varchar"
                    },
                    {
                        name: "artista",
                        type: 'varchar'
                    },
                    {
                        name: 'duracao',
                        type: "time"
                    },
                    {
                        name: "genero",
                        type: "varchar"
                    },
                    {
                        name: "ano_lancamento",
                        type: "int"
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("musicas")
    }

}
