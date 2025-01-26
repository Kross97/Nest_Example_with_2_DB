"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Name = void 0;
// eslint-disable-next-line max-classes-per-file
const typeorm_1 = require("typeorm");
const car_entity_1 = require("../car/car.entity");
const rent_car_entity_1 = require("../rentCar/rent-car.entity");
const MediaMaterials_entity_1 = require("../media_materials/MediaMaterials.entity");
const role_entity_1 = require("./role.entity");
class Name {
  first;
  last;
}
__decorate([(0, typeorm_1.Column)(), __metadata("design:type", String)], Name.prototype, "first", void 0);
__decorate([(0, typeorm_1.Column)(), __metadata("design:type", String)], Name.prototype, "last", void 0);
exports.Name = Name;
let User = class User {
  id;
  name;
  test;
  login;
  password;
  // выставляется автоматически , без указания  @JoinColumn()
  role;
  car;
  // Вы должны поставить @JoinTable на одну (владеющую) сторону отношения.
  rentCars;
  //  Если вы хотите использовать @OneToMany, @ManyToOne является обязательным.
  mediaMaterials;
  createdAt;
};
__decorate([(0, typeorm_1.PrimaryGeneratedColumn)(), __metadata("design:type", String)], User.prototype, "id", void 0);
__decorate([(0, typeorm_1.Column)(() => Name), __metadata("design:type", Name)], User.prototype, "name", void 0);
__decorate([(0, typeorm_1.Column)({ nullable: true, default: "test" }), __metadata("design:type", String)], User.prototype, "test", void 0);
__decorate([(0, typeorm_1.Column)({ default: "login", unique: true }), __metadata("design:type", String)], User.prototype, "login", void 0);
__decorate([(0, typeorm_1.Column)({ default: "password" }), __metadata("design:type", String)], User.prototype, "password", void 0);
__decorate(
  [
    (0, typeorm_1.ManyToOne)(() => role_entity_1.RoleEntity, { cascade: true }), // @ManyToOne при это отношении внешний ключ
    // выставляется автоматически , без указания  @JoinColumn()
    __metadata("design:type", role_entity_1.RoleEntity),
  ],
  User.prototype,
  "role",
  void 0
);
__decorate(
  [
    (0, typeorm_1.OneToOne)(
      () => car_entity_1.Car,
      (car) => car.user,
      { cascade: true, nullable: true }
    ),
    // { cascade: true} - нужен для рекурсивной вставки элементов
    (0, typeorm_1.JoinColumn)(), // выставляет внешний ключ на этой таблице (carId)
    __metadata("design:type", car_entity_1.Car),
  ],
  User.prototype,
  "car",
  void 0
);
__decorate(
  [
    (0, typeorm_1.ManyToMany)(
      () => rent_car_entity_1.RentCarEntity,
      (rentCar) => rentCar.users,
      { cascade: true, nullable: true }
    ),
    (0, typeorm_1.JoinTable)(), // @JoinTable() требуется для @ManyToMany отношений.
    // Вы должны поставить @JoinTable на одну (владеющую) сторону отношения.
    __metadata("design:type", Array),
  ],
  User.prototype,
  "rentCars",
  void 0
);
__decorate(
  [
    (0, typeorm_1.OneToMany)(
      () => MediaMaterials_entity_1.MediaMaterialsEntity,
      (mediaMaterial) => mediaMaterial.user,
      {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        cascade: ["insert"],
        nullable: true,
      }
    ),
    //  Если вы хотите использовать @OneToMany, @ManyToOne является обязательным.
    __metadata("design:type", Array),
  ],
  User.prototype,
  "mediaMaterials",
  void 0
);
__decorate([(0, typeorm_1.CreateDateColumn)(), __metadata("design:type", Date)], User.prototype, "createdAt", void 0);
User = __decorate([(0, typeorm_1.Entity)()], User);
exports.User = User;
