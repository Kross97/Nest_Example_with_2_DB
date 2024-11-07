import { Controller, Get } from '@nestjs/common';
import { RentCarsService } from './rentCars.service';


@Controller('rentCars')
export class RentCarsController {
  constructor(private readonly rentCarsService: RentCarsService) {}

  @Get()
  create() {
    return this.rentCarsService.createUser();
  }

  @Get('all')
  getRentCars() {
    return this.rentCarsService.getRentCars()
  }
}
