import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddPlaylistIdToMusicas1751511443204 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('musicas',
            new TableColumn({
                name: 'playlist_id',
                type: 'uuid',
                isNullable: true
            })
        );

        await queryRunner.createForeignKey('musicas',
            new TableForeignKey({
                name: 'MusicasPlaylistMusicas',
                columnNames: ['playlist_id'],
                referencedTableName: 'playlists',
                referencedColumnNames: ['id'],
                onDelete: "SET NULL"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('musicas', 'MusicasPlaylistMusicas');
        await queryRunner.dropColumn('musicas', 'playlist_id');
    }

}
