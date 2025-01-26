"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentCarEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
let RentCarEntity = class RentCarEntity {
    id;
    model;
    year;
    // { cascade: ['insert']} нужно для рекурсивной вставки структуры (если у User cascade: true)
    // т.к cascade: true c двух сторон даст ошибку
    users;
    createdAt;
    updateAt;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RentCarEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RentCarEntity.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], RentCarEntity.prototype, "year", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.rentCars, { cascade: ["insert"] })
    // { cascade: ['insert']} нужно для рекурсивной вставки структуры (если у User cascade: true)
    // т.к cascade: true c двух сторон даст ошибку
    ,
    __metadata("design:type", Array)
], RentCarEntity.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], RentCarEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], RentCarEntity.prototype, "updateAt", void 0);
RentCarEntity = __decorate([
    (0, typeorm_1.Entity)()
], RentCarEntity);
exports.RentCarEntity = RentCarEntity;
//# sourceMappingURL=rent-car.entity.js.map