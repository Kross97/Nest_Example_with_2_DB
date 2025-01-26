"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRolesGuards1731510576882 = void 0;
class AddRolesGuards1731510576882 {
    name = "AddRolesGuards1731510576882";
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL DEFAULT 'manager'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    }
}
exports.AddRolesGuards1731510576882 = AddRolesGuards1731510576882;
//# sourceMappingURL=1731510576882-AddRolesGuards.js.map