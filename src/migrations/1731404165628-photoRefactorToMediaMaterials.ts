import { MigrationInterface, QueryRunner } from "typeorm";

export class PhotoRefactorToMediaMaterials1731404165628 implements MigrationInterface {
  name = "PhotoRefactorToMediaMaterials1731404165628";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "photo_entity"`);
    await queryRunner.query(
      `CREATE TABLE "media_materials_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "size" integer NOT NULL, "mimeType" character varying NOT NULL, "data" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_b7b996aec7d87b030980205fdb0" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "media_materials_entity" ADD CONSTRAINT "FK_db0d8e2d27a2880eda822c317b1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "media_materials_entity" DROP CONSTRAINT "FK_db0d8e2d27a2880eda822c317b1"`
    );
    await queryRunner.query(`DROP TABLE "media_materials_entity"`);
  }
}
