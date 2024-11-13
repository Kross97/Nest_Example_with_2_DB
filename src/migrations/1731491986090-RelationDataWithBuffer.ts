import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationDataWithBuffer1731491986090 implements MigrationInterface {
    name = 'RelationDataWithBuffer1731491986090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM "media_materials_entity"')
        await queryRunner.query(`ALTER TABLE "media_materials_entity" ADD "bufferId" integer`);
        await queryRunner.query(`ALTER TABLE "media_materials_entity" ADD CONSTRAINT "UQ_9da806e01cc63b4d73ea42ce405" UNIQUE ("bufferId")`);
        await queryRunner.query(`ALTER TABLE "media_materials_entity" ADD CONSTRAINT "FK_9da806e01cc63b4d73ea42ce405" FOREIGN KEY ("bufferId") REFERENCES "media_buffer_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media_materials_entity" DROP CONSTRAINT "FK_9da806e01cc63b4d73ea42ce405"`);
        await queryRunner.query(`ALTER TABLE "media_materials_entity" DROP CONSTRAINT "UQ_9da806e01cc63b4d73ea42ce405"`);
        await queryRunner.query(`ALTER TABLE "media_materials_entity" DROP COLUMN "bufferId"`);
    }

}
