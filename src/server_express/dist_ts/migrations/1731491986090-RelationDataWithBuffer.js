"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationDataWithBuffer1731491986090 = void 0;
class RelationDataWithBuffer1731491986090 {
    name = "RelationDataWithBuffer1731491986090";
    async up(queryRunner) {
        await queryRunner.query('DELETE FROM "media_materials_entity"');
        await queryRunner.query(`ALTER TABLE "media_materials_entity" ADD "bufferId" integer`);
        await queryRunner.query(`ALTER TABLE "media_materials_entity" ADD CONSTRAINT "UQ_9da806e01cc63b4d73ea42ce405" UNIQUE ("bufferId")`);
        await queryRunner.query(`ALTER TABLE "media_materials_entity" ADD CONSTRAINT "FK_9da806e01cc63b4d73ea42ce405" FOREIGN KEY ("bufferId") REFERENCES "media_buffer_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "media_materials_entity" DROP CONSTRAINT "FK_9da806e01cc63b4d73ea42ce405"`);
        await queryRunner.query(`ALTER TABLE "media_materials_entity" DROP CONSTRAINT "UQ_9da806e01cc63b4d73ea42ce405"`);
        await queryRunner.query(`ALTER TABLE "media_materials_entity" DROP COLUMN "bufferId"`);
    }
}
exports.RelationDataWithBuffer1731491986090 = RelationDataWithBuffer1731491986090;
//# sourceMappingURL=1731491986090-RelationDataWithBuffer.js.map