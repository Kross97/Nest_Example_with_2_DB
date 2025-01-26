"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoRefactorToMediaMaterials1731404165628 = void 0;
class PhotoRefactorToMediaMaterials1731404165628 {
    name = "PhotoRefactorToMediaMaterials1731404165628";
    async up(queryRunner) {
        await queryRunner.query(`DROP TABLE "photo_entity"`);
        await queryRunner.query(`CREATE TABLE "media_materials_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "size" integer NOT NULL, "mimeType" character varying NOT NULL, "data" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_b7b996aec7d87b030980205fdb0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "media_materials_entity" ADD CONSTRAINT "FK_db0d8e2d27a2880eda822c317b1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "media_materials_entity" DROP CONSTRAINT "FK_db0d8e2d27a2880eda822c317b1"`);
        await queryRunner.query(`DROP TABLE "media_materials_entity"`);
    }
}
exports.PhotoRefactorToMediaMaterials1731404165628 = PhotoRefactorToMediaMaterials1731404165628;
//# sourceMappingURL=1731404165628-photoRefactorToMediaMaterials.js.map