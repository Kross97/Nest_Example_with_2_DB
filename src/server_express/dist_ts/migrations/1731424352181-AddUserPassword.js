"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserPassword1731424352181 = void 0;
class AddUserPassword1731424352181 {
    name = "AddUserPassword1731424352181";
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "login" character varying NOT NULL DEFAULT 'login'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL DEFAULT 'password'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "test" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "test" SET DEFAULT 'test'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "test" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "test" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "login"`);
    }
}
exports.AddUserPassword1731424352181 = AddUserPassword1731424352181;
//# sourceMappingURL=1731424352181-AddUserPassword.js.map