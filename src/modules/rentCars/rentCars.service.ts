import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RentCarEntity } from "../../entities/rentCar/rent-car.entity";

@Injectable()
export class RentCarsService {
  constructor(@InjectRepository(RentCarEntity) private rentCarsRepository: Repository<RentCarEntity>) {}

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
}
