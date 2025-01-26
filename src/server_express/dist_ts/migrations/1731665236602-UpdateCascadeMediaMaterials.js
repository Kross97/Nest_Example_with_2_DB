"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCascadeMediaMaterials1731665236602 = void 0;
class UpdateCascadeMediaMaterials1731665236602 {
    name = "UpdateCascadeMediaMaterials1731665236602";
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "media_materials_entity" DROP CONSTRAINT "FK_9da806e01cc63b4d73ea42ce405"`);
        await queryRunner.query(`ALTER TABLE "media_materials_entity" ADD CONSTRAINT "FK_9da806e01cc63b4d73ea42ce405" FOREIGN KEY ("bufferId") REFERENCES "media_buffer_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "media_materials_entity" DROP CONSTRAINT "FK_9da806e01cc63b4d73ea42ce405"`);
        await queryRunner.query(`ALTER TABLE "media_materials_entity" ADD CONSTRAINT "FK_9da806e01cc63b4d73ea42ce405" FOREIGN KEY ("bufferId") REFERENCES "media_buffer_entity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
exports.UpdateCascadeMediaMaterials1731665236602 = UpdateCascadeMediaMaterials1731665236602;
//# sourceMappingURL=1731665236602-UpdateCascadeMediaMaterials.js.map