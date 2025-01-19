import { MigrationInterface, QueryRunner } from "typeorm";

export class Create1730303321791 implements MigrationInterface {
  name = "Create1730303321791";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "test" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "nameFirst" character varying NOT NULL, "nameLast" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
