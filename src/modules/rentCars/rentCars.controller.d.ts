import { RentCarsService } from "./rentCars.service";
export declare class RentCarsController {
    private readonly rentCarsService;
    constructor(rentCarsService: RentCarsService);
    create(): Promise<import("typeorm").DeepPartial<import("../../entities/rentCar/rent-car.entity").RentCarEntity>[]>;
    getRentCars(): Promise<import("../../entities/rentCar/rent-car.entity").RentCarEntity[]>;
}
//# sourceMappingURL=rentCars.controller.d.ts.map