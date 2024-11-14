import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user/user.entity';
import { Repository } from 'typeorm';
import { Car } from '../../entities/car/car.entity';
import { MOCK_USER } from './constants';
import { fileToMediaEntity } from '../../common/utils/fileToMediaEntity';
import { IUserRequest } from './types';
import { HTTP_ERROR_DICTIONARY } from '../../common/constants/httpErrorDictionary';
import { RoleEntity } from '../../entities/user/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Car) private carRepository: Repository<Car>,
    @InjectRepository(RoleEntity) private roleEntityRepository: Repository<RoleEntity>
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
    });
  }

  async createUser(user: IUserRequest) {
    const userExist = await this.userRepository.count({
      where: {
        login: user.login,
      },
    });

    if (!userExist) {
      const userSaved = await this.userRepository.save({
        login: user.login,
        password: user.password,
        name: { first: user.nameFirst, last: user.nameLast },
      });

      return { status: 'Пользователь_сохранен', userSaved };
    }

    return new HTTP_ERROR_DICTIONARY.ConflictException('Такой пользователь уже есть в базе');
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
        role: true
      },
    });
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
    return `ПОЛЬЗОВАТЕЛЬ_С_ИД:${id}_УДАЛЕН`;
  }

  async updateUser(id: string, body: IUserRequest) {
    const updatedUSer = await this.userRepository.update(id, {
      name: { last: body.nameLast, first: body.nameFirst },
      login: body.login,
      password: body.password,
      role: body.role,
    });
    return { status: 'Пользователь_обновлен', updatedUSer };
  }

  async getAllRoles() {
    return this.roleEntityRepository.find();
  }
}
