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
exports.RentCarsController = void 0;
const common_1 = require("@nestjs/common");
const rentCars_service_1 = require("./rentCars.service");
let RentCarsController = class RentCarsController {
    rentCarsService;
    constructor(rentCarsService) {
        this.rentCarsService = rentCarsService;
    }
    create() {
        return this.rentCarsService.createUser();
    }
    getRentCars() {
        return this.rentCarsService.getRentCars();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RentCarsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RentCarsController.prototype, "getRentCars", null);
RentCarsController = __decorate([
    (0, common_1.Controller)("rentCars"),
    __metadata("design:paramtypes", [rentCars_service_1.RentCarsService])
], RentCarsController);
exports.RentCarsController = RentCarsController;
//# sourceMappingURL=rentCars.controller.js.map