"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueUserLogin1732270673692 = void 0;
class UniqueUserLogin1732270673692 {
    name = "UniqueUserLogin1732270673692";
    async up(queryRunner) {
        // Найти почему рассинхрон со схемой для CHECK констрэйнта
        // await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "model_germany_check"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "login"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "login" character varying NOT NULL DEFAULT upper(substr(md5(random()::text), 1, 3))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_a62473490b3e4578fd683235c5e"`);
        // await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "model_germany_check" CHECK ((((model)::text = 'vw'::text) OR ((model)::text = 'bmw'::text) OR ((model)::text = 'mercedes'::text)))`);
    }
}
exports.UniqueUserLogin1732270673692 = UniqueUserLogin1732270673692;
//# sourceMappingURL=1732270673692-UniqueUserLogin.js.map