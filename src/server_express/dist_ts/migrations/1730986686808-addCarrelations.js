"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create1730986686808 = void 0;
class Create1730986686808 {
    name = "Create1730986686808";
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "car" ("id" SERIAL NOT NULL, "model" integer NOT NULL, "year" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "carId" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_bf812cb2c6baba866991d9781c7" UNIQUE ("carId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_bf812cb2c6baba866991d9781c7" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_bf812cb2c6baba866991d9781c7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_bf812cb2c6baba866991d9781c7"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "carId"`);
        await queryRunner.query(`DROP TABLE "car"`);
    }
}
exports.Create1730986686808 = Create1730986686808;
//# sourceMappingURL=1730986686808-addCarrelations.js.map