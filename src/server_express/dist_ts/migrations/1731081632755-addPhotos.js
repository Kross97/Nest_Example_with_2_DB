"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create1731081632755 = void 0;
class Create1731081632755 {
    name = "Create1731081632755";
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "photo_entity" ("id" SERIAL NOT NULL, "data" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_e3a5807b27c3b7e1f36c9e65fac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "photo_entity" ADD CONSTRAINT "FK_19cd6e42249b6491818b06a550e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "photo_entity" DROP CONSTRAINT "FK_19cd6e42249b6491818b06a550e"`);
        await queryRunner.query(`DROP TABLE "photo_entity"`);
    }
}
exports.Create1731081632755 = Create1731081632755;
//# sourceMappingURL=1731081632755-addPhotos.js.map