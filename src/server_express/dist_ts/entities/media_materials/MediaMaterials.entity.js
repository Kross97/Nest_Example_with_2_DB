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
exports.MediaMaterialsEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const MediaBuffer_entity_1 = require("./MediaBuffer.entity");
let MediaMaterialsEntity = class MediaMaterialsEntity {
    id;
    name;
    size;
    mimeType;
    buffer;
    //  @ManyToOne, вы можете определить его без указания @OneToMany у связанной сущности
    //  Где вы устанавливаете @ManyToOne- его связанная сущность
    //  будет иметь "идентификатор отношения" и внешний ключ.
    user;
    createdAt;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MediaMaterialsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MediaMaterialsEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], MediaMaterialsEntity.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MediaMaterialsEntity.prototype, "mimeType", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => MediaBuffer_entity_1.MediaBufferEntity, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", MediaBuffer_entity_1.MediaBufferEntity)
], MediaMaterialsEntity.prototype, "buffer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.mediaMaterials, {
        onDelete: "CASCADE",
        nullable: true,
    })
    //  @ManyToOne, вы можете определить его без указания @OneToMany у связанной сущности
    //  Где вы устанавливаете @ManyToOne- его связанная сущность
    //  будет иметь "идентификатор отношения" и внешний ключ.
    ,
    __metadata("design:type", user_entity_1.User)
], MediaMaterialsEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MediaMaterialsEntity.prototype, "createdAt", void 0);
MediaMaterialsEntity = __decorate([
    (0, typeorm_1.Entity)()
], MediaMaterialsEntity);
exports.MediaMaterialsEntity = MediaMaterialsEntity;
//# sourceMappingURL=MediaMaterials.entity.js.map