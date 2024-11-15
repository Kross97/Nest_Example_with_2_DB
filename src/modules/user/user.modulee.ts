import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user/user.entity';
import { Car } from '../../entities/car/car.entity';
import { RoleEntity } from '../../entities/user/role.entity';
import { MediaMaterialsEntity } from '../../entities/media_materials/MediaMaterials.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Car, RoleEntity, MediaMaterialsEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}