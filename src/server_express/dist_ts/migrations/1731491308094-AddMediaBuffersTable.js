"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddMediaBuffers1731491308094 = void 0;
class AddMediaBuffers1731491308094 {
    name = "AddMediaBuffers1731491308094";
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "media_buffer_entity" ("id" SERIAL NOT NULL, "buffer" jsonb NOT NULL, CONSTRAINT "PK_dbeb3139517d6b82a211b4f8820" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "media_materials_entity" DROP COLUMN "data"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "media_materials_entity" ADD "data" jsonb NOT NULL`);
        await queryRunner.query(`DROP TABLE "media_buffer_entity"`);
    }
}
exports.AddMediaBuffers1731491308094 = AddMediaBuffers1731491308094;
//# sourceMappingURL=1731491308094-AddMediaBuffersTable.js.map