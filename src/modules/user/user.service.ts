import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user/user.entity';
import { Repository } from 'typeorm';
import { Car } from '../../entities/car/car.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Car) private carRepository: Repository<Car>
  ) {
  }

  async createUser() {
    const user = await this.userRepository.save({ name: {
        first: 'first_name',
        last: 'last_name',
      }, test: 'test ', car: {
          model: 1,
          year: 2001,
      }})

    return user;
  }

  getUsers() {
    return this.userRepository.find({
      relations: {
        rentCars: true // для получение всех связанных сущностей
      }
    });
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id)
    return `DELETE_${id}_SUCCESS`;
  }
}
