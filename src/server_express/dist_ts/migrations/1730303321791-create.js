"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create1730303321791 = void 0;
class Create1730303321791 {
    name = "Create1730303321791";
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "test" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "nameFirst" character varying NOT NULL, "nameLast" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
exports.Create1730303321791 = Create1730303321791;
//# sourceMappingURL=1730303321791-create.js.map