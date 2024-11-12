import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPassword1731424352181 implements MigrationInterface {
    name = 'AddUserPassword1731424352181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "login" character varying NOT NULL DEFAULT 'login'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL DEFAULT 'password'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "test" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "test" SET DEFAULT 'test'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "test" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "test" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "login"`);
    }

}
