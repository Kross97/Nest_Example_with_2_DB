import { MigrationInterface, QueryRunner } from "typeorm";

export class CarAddCheckConstraint1732264805517 implements MigrationInterface {
  name = "CarAddCheckConstraint1732264805517";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "model"`);
    await queryRunner.query(
      `ALTER TABLE "car" ADD "model" character varying NOT NULL DEFAULT 'vw' CONSTRAINT model_germany_check CHECK ("model" = 'vw' OR "model" = 'bmw' OR "model" = 'mercedes')`
    );
    await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "year" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "year" SET DEFAULT '2024'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "year" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "year" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "model"`);
    await queryRunner.query(`ALTER TABLE "car" ADD "model" integer NOT NULL`);
  }
}
