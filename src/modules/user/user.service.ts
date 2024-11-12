import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user/user.entity';
import { Repository } from 'typeorm';
import { Car } from '../../entities/car/car.entity';
import { MOCK_USER } from './constants';
import { fileToMediaEntity } from '../../utils/fileToMediaEntity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Car) private carRepository: Repository<Car>,
  ) {
  }

  async createUser() {
    const user = await this.userRepository.save(MOCK_USER);

    return user;
  }

  async createUserWithMedia(user: User, file: Express.Multer.File) {
    user.mediaMaterials = [fileToMediaEntity(file)];
    await this.userRepository.save(user);

    return { status: 'ПОЛЬЗОВАТЕЛЬ_С_FORM_DATA_PHOTO_СОЗДАН', user};
  };

  getUsers() {
    return this.userRepository.find({
      relations: {
        rentCars: true, // для получение всех связанных сущностей
      },
    });
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
    return `ПОЛЬЗОВАТЕЛЬ_С_ИД:${id}_УДАЛЕН`;
  }
}
