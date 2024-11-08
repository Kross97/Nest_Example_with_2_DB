import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user/user.entity';
import { Car } from '../../entities/car/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Car])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}