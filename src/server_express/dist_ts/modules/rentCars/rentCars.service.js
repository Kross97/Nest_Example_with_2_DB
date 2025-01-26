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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentCarsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rent_car_entity_1 = require("../../entities/rentCar/rent-car.entity");
let RentCarsService = class RentCarsService {
    rentCarsRepository;
    constructor(rentCarsRepository) {
        this.rentCarsRepository = rentCarsRepository;
    }
    async createUser() {
        const rentCars = await this.rentCarsRepository.save({
            year: 2002,
            model: "mercedes",
            users: [
                {
                    name: {
                        first: "user_rent_car_first",
                        last: "user_rent_car_last",
                    },
                    test: "test",
                },
                {
                    name: {
                        first: "user_rent_car_first",
                        last: "user_rent_car_last",
                    },
                    test: "test",
                },
                {
                    name: {
                        first: "user_rent_car_first",
                        last: "user_rent_car_last",
                    },
                    test: "test",
                },
            ],
        });
        return rentCars;
    }
    getRentCars() {
        return this.rentCarsRepository.find({
            relations: {
                users: true,
            },
        });
    }
};
RentCarsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rent_car_entity_1.RentCarEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RentCarsService);
exports.RentCarsService = RentCarsService;
//# sourceMappingURL=rentCars.service.js.map