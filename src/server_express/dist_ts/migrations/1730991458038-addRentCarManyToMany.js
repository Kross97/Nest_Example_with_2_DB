"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create1730991458038 = void 0;
class Create1730991458038 {
    name = "Create1730991458038";
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "rent_car_entity" ("id" SERIAL NOT NULL, "model" character varying NOT NULL, "year" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_83316d6530e6e795a194f63f16c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_rent_cars_rent_car_entity" ("userId" integer NOT NULL, "rentCarEntityId" integer NOT NULL, CONSTRAINT "PK_783388943baf79e02290d70d362" PRIMARY KEY ("userId", "rentCarEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0af7dfe8d26cff5663a7b3ff55" ON "user_rent_cars_rent_car_entity" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_68f79781ee87e67e0a64e7fc9b" ON "user_rent_cars_rent_car_entity" ("rentCarEntityId") `);
        await queryRunner.query(`ALTER TABLE "user_rent_cars_rent_car_entity" ADD CONSTRAINT "FK_0af7dfe8d26cff5663a7b3ff555" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_rent_cars_rent_car_entity" ADD CONSTRAINT "FK_68f79781ee87e67e0a64e7fc9b7" FOREIGN KEY ("rentCarEntityId") REFERENCES "rent_car_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_rent_cars_rent_car_entity" DROP CONSTRAINT "FK_68f79781ee87e67e0a64e7fc9b7"`);
        await queryRunner.query(`ALTER TABLE "user_rent_cars_rent_car_entity" DROP CONSTRAINT "FK_0af7dfe8d26cff5663a7b3ff555"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_68f79781ee87e67e0a64e7fc9b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0af7dfe8d26cff5663a7b3ff55"`);
        await queryRunner.query(`DROP TABLE "user_rent_cars_rent_car_entity"`);
        await queryRunner.query(`DROP TABLE "rent_car_entity"`);
    }
}
exports.Create1730991458038 = Create1730991458038;
//# sourceMappingURL=1730991458038-addRentCarManyToMany.js.map