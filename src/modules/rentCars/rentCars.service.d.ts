import { Repository } from "typeorm";
import { RentCarEntity } from "../../entities/rentCar/rent-car.entity";
export declare class RentCarsService {
    private rentCarsRepository;
    constructor(rentCarsRepository: Repository<RentCarEntity>);
    createUser(): Promise<import("typeorm").DeepPartial<RentCarEntity>[]>;
    getRentCars(): Promise<RentCarEntity[]>;
}
//# sourceMappingURL=rentCars.service.d.ts.map