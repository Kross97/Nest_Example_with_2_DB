import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCascadeMediaMaterials1731665236602 implements MigrationInterface {
    name = 'UpdateCascadeMediaMaterials1731665236602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media_materials_entity" DROP CONSTRAINT "FK_9da806e01cc63b4d73ea42ce405"`);
        await queryRunner.query(`ALTER TABLE "media_materials_entity" ADD CONSTRAINT "FK_9da806e01cc63b4d73ea42ce405" FOREIGN KEY ("bufferId") REFERENCES "media_buffer_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media_materials_entity" DROP CONSTRAINT "FK_9da806e01cc63b4d73ea42ce405"`);
        await queryRunner.query(`ALTER TABLE "media_materials_entity" ADD CONSTRAINT "FK_9da806e01cc63b4d73ea42ce405" FOREIGN KEY ("bufferId") REFERENCES "media_buffer_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
