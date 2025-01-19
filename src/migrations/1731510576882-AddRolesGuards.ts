import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolesGuards1731510576882 implements MigrationInterface {
  name = "AddRolesGuards1731510576882";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'manager'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
  }
}
