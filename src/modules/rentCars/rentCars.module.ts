import { Module } from '@nestjs/common';
import { RentCarsService } from './rentCars.service';
import { RentCarsController } from './rentCars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentCarEntity } from '../../entities/rentCar/rent-car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RentCarEntity])],
  controllers: [RentCarsController],
  providers: [RentCarsService],
})
export class RentCarsModule {}