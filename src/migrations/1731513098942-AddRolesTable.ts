import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRolesTable1731513098942 implements MigrationInterface {
    name = 'AddRolesTable1731513098942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "role" TO "roleId"`);
        await queryRunner.query(`CREATE TABLE "role_entity" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_7bc1bd2364b6e9bf7c84b1e52e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "test" SET DEFAULT 'test'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`);

        // наполнение базы
        await queryRunner.query(`INSERT INTO "role_entity" ("id", "role") VALUES (1, 'manager')`);


        await queryRunner.query(`ALTER TABLE "user" ADD "roleId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        await queryRunner.query(`UPDATE "user" SET "roleId"=1`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roleId" character varying NOT NULL DEFAULT 'manager'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "test" SET DEFAULT 'test_alter'`);
        await queryRunner.query(`DROP TABLE "role_entity"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "roleId" TO "role"`);
    }

}
