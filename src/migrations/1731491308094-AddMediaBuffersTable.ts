import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMediaBuffers1731491308094 implements MigrationInterface {
  name = "AddMediaBuffers1731491308094";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "media_buffer_entity" ("id" SERIAL NOT NULL, "buffer" jsonb NOT NULL, CONSTRAINT "PK_dbeb3139517d6b82a211b4f8820" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "media_materials_entity" DROP COLUMN "data"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "media_materials_entity" ADD "data" jsonb NOT NULL`);
    await queryRunner.query(`DROP TABLE "media_buffer_entity"`);
  }
}
