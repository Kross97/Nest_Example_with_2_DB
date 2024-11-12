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

  async createUserMock() {
    const user = await this.userRepository.save(MOCK_USER);

    return user;
  }

  async refreshUserData() {
    const users = await this.userRepository.find();

    const refreshUsers = users.map((u) => ({ ...u, login: `login${String(Math.random()).slice(0, 4)}` }));
    refreshUsers.forEach(async (nUser) => {
      await this.userRepository.update(nUser.id, { login: nUser.login });
    })
  }

  async createUser(user: User) {
    const userSaved = await this.userRepository.save(user);

    return { status: 'Пользователь_сохранен', userSaved };
  }

  async createUserWithMedia(user: User, file: Express.Multer.File) {
    user.mediaMaterials = [fileToMediaEntity(file)];
    await this.userRepository.save(user);

    return { status: 'ПОЛЬЗОВАТЕЛЬ_С_FORM_DATA_PHOTO_СОЗДАН', user };
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

  async updateUser(id: string, body: Partial<User>) {
    console.log('body =>', body, 'id =>', id);
    const updatedUSer = await this.userRepository.update(id, {...body});
    console.log( 'updated_user', updatedUSer);
    return {status: 'Пользователь_обновлен', updatedUSer }
  }
}
