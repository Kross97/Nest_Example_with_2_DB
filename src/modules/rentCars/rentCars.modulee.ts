import { Module } from "@nestjs/common";

import { TypeOrmModule } from "@nestjs/typeorm";
import { RentCarEntity } from "../../entities/rentCar/rent-car.entity";
import { RentCarsController } from "./rentCars.controller";
import { RentCarsService } from "./rentCars.service";

@Module({
  imports: [TypeOrmModule.forFeature([RentCarEntity])],
  controllers: [RentCarsController],
  providers: [RentCarsService],
})
export class RentCarsModule {}
