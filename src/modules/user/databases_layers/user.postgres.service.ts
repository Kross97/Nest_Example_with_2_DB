import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
// @ts-ignore
import { Repository } from "typeorm";
import { User } from "../../../entities/user/user.entity";
import { Car } from "../../../entities/car/car.entity";
import { MOCK_USER } from "../constants";
import { fileToMediaEntity } from "../../../common/utils/fileToMediaEntity";
import { IUserRequest } from "../types";
import { HTTP_ERROR_DICTIONARY } from "../../../common/constants/httpErrorDictionary";
import { RoleEntity } from "../../../entities/user/role.entity";
import { MediaMaterialsEntity } from "../../../entities/media_materials/MediaMaterials.entity";
import { MediaBufferEntity } from "../../../entities/media_materials/MediaBuffer.entity";

@Injectable()
export class UserPostgresService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Car) private carRepository: Repository<Car>,
    @InjectRepository(RoleEntity) private roleEntityRepository: Repository<RoleEntity>,
    @InjectRepository(MediaMaterialsEntity)
    private mediaMaterialsEntityRepository: Repository<MediaMaterialsEntity>
  ) {}

  async createUserMock() {
    const user = await this.userRepository.save(MOCK_USER);

    return user;
  }

  async refreshUserData() {
    const users = await this.userRepository.find();

    const refreshUsers = users.map((u) => ({
      ...u,
      login: `login${String(Math.random()).slice(0, 4)}`,
    }));
    refreshUsers.forEach(async (nUser) => {
      await this.userRepository.update(nUser.id, { login: nUser.login });
    });
  }

  async getOneUser(id: string) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        role: true,
        car: true,
        mediaMaterials: true,
      },
    });
  }

  async createUser(user: IUserRequest) {
    if (!user.login || !user.password || !user.nameFirst || !user.nameLast) {
      throw new HTTP_ERROR_DICTIONARY.ConflictException(
        `Обязательный данные у пользователя отсуствуют, данные: ${JSON.stringify(user)}`
      ).getResponse();
    }

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
        mediaMaterials: user.mediaMaterials || null,
        car: user.car || null,
        role: user.role || null,
      });

      return { status: "Пользователь_сохранен", userSaved };
    }

    throw new HTTP_ERROR_DICTIONARY.ConflictException("Такой пользователь уже есть в базе").getResponse();
  }

  async createUserWithMedia(user: User, file: Express.Multer.File) {
    user.mediaMaterials = [fileToMediaEntity(file)];
    await this.userRepository.save(user);

    return { status: "ПОЛЬЗОВАТЕЛЬ_С_FORM_DATA_PHOTO_СОЗДАН", user };
  }

  getUsers(query: Record<"search", string>) {
    return this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.role", "role")
      .leftJoinAndSelect("user.rentCars", "rentCars")
      .where(`user.nameFirst LIKE '%${query.search || ""}%'`)
      .orWhere(`user.login LIKE '%${query.search || ""}%'`)
      .orWhere(`user.nameLast LIKE '%${query.search || ""}%'`)
      .cache(10_000)
      .getMany();
  }

  async deleteUser(idOrLogin: string) {
    await this.userRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      // id должен передаваться только число иначе падает ошибкой при запросе к БД
      .where("id = :id", { id: Number(idOrLogin) ? idOrLogin : -1 })
      .orWhere("login = :login", { login: idOrLogin })
      .execute();
    return `ПОЛЬЗОВАТЕЛЬ_С_ИД:${idOrLogin}_УДАЛЕН`;
  }

  /**
   * Когда при обновлении данных которые уже есть в БД (в данном случае user) нужно прикрепить связанные данные
   * которых еще нет в БД (в данном случае car) , нужно создать связанные данные через .save()
   * а затем обновить главную сущность (через user -> update) с прикреплением связанных данных (car)
   *
   * -------------------------------------------------
   *
   * Если бы всех данных не было бы в БД , то метод .save() на главной сущности рекурсивно бы создал как
   * главную сущность (user) так и связанные сущности (car)
   * */
  async updateUser(id: string, body: IUserRequest) {
    let newCar: Car | null = null;
    if (body.car) {
      const currentUser = await this.userRepository.findOneBy({ id });
      try {
        newCar = await this.carRepository.save({ user: currentUser, model: body.car.model });
      } catch (err) {
        /**
         * Мой установленный констрэйнт на валидацию названий модели в БД
         * CONSTRAINT model_germany_check CHECK ("model" = 'vw' OR "model" = 'bmw' OR "model" = 'mercedes')
         * */
        if (err.constraint === "model_germany_check") {
          throw new HTTP_ERROR_DICTIONARY.ConflictException("Не прошло валидацию значения model в БД").getResponse();
        }
      }
    }

    const updatedUSer = await this.userRepository.update(id, {
      name: { last: body.nameLast, first: body.nameFirst },
      login: body.login,
      password: body.password,
      role: body.role,
      car: newCar,
    });
    return { status: "Пользователь_обновлен", updatedUSer };
  }

  async getAllRoles() {
    return this.roleEntityRepository.find({ cache: 10_000 });
  }

  /**
   * Сохранять массив новых данных (mediaMaterials) лучше через создание save
   * (this.mediaMaterialsEntityRepository.save(mediaMaterials)) и привязки их к user
   * в данном случае обновление на User через this.userRepository.update(id, { mediaMaterials }) не работает
   * показывает ошибку в добавлении при связи one-to-many
   *
   * Моя заметка: обновление через update работать не будет если связанные сущности
   * еще не были созданы в БД, а главная сущность (в данном случае user) уже созданна в БД
   * */
  async updatePhotos(id: string, files: Express.Multer.File[]) {
    const currentUser = await this.userRepository.findOneBy({ id });

    const mediaMaterials = files.map((file) => {
      const mediaEntity = new MediaMaterialsEntity();
      mediaEntity.user = currentUser;
      mediaEntity.mimeType = file.mimetype;
      mediaEntity.size = file.size;
      mediaEntity.name = file.originalname;

      const buffer = new MediaBufferEntity();
      // @ts-ignore
      buffer.buffer = file.buffer;
      mediaEntity.buffer = buffer;
      return mediaEntity;
    });

    /**
     * Вызовет ошибку в добавлении при связи one-to-many
     * */
    // await this.userRepository.update(id, { mediaMaterials })

    await this.mediaMaterialsEntityRepository.save(mediaMaterials);
    return { status: `ОБНОВЛЕНИЕ_ФОТОГРАФИЙ_ПОЛЬЗОАВТЕЛЯ:${id}` };
  }
}
