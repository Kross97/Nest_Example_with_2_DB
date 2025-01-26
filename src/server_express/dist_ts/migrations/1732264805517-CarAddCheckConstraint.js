"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarAddCheckConstraint1732264805517 = void 0;
class CarAddCheckConstraint1732264805517 {
    name = "CarAddCheckConstraint1732264805517";
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "model"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "model" character varying NOT NULL DEFAULT 'vw' CONSTRAINT model_germany_check CHECK ("model" = 'vw' OR "model" = 'bmw' OR "model" = 'mercedes')`);
        await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "year" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "year" SET DEFAULT '2024'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "year" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "car" ALTER COLUMN "year" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "car" DROP COLUMN "model"`);
        await queryRunner.query(`ALTER TABLE "car" ADD "model" integer NOT NULL`);
    }
}
exports.CarAddCheckConstraint1732264805517 = CarAddCheckConstraint1732264805517;
//# sourceMappingURL=1732264805517-CarAddCheckConstraint.js.map