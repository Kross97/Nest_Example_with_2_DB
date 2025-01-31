import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
// @ts-ignore
import { Repository } from "typeorm";
import { User } from "../../../../entities/user/user.entity";
import { Car } from "../../../../entities/car/car.entity";
import { IUserRequest } from "../../types";
import { HTTP_ERROR_DICTIONARY } from "../../../../common/constants/httpErrorDictionary";
import { RoleEntity } from "../../../../entities/user/role.entity";
import { MediaMaterialsEntity } from "../../../../entities/media_materials/MediaMaterials.entity";
import { UserPostgresDb } from "./user.postgres.db";

@Injectable()
export class UserPostgresService {
  private userPostgresDb: UserPostgresDb;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Car) private carRepository: Repository<Car>,
    @InjectRepository(RoleEntity) private roleEntityRepository: Repository<RoleEntity>,
    @InjectRepository(MediaMaterialsEntity)
    private mediaMaterialsEntityRepository: Repository<MediaMaterialsEntity>
  ) {
    this.userPostgresDb = new UserPostgresDb(
      this.userRepository,
      this.carRepository,
      this.roleEntityRepository,
      this.mediaMaterialsEntityRepository
    );
  }

  createUserMock() {
    return this.userPostgresDb.createUserMock();
  }

  refreshUserData() {
    return this.userPostgresDb.refreshUserData();
  }

  getOneUser(id: string) {
    return this.userPostgresDb.getOneUser(id);
  }

  async createUser(user: IUserRequest) {
    if (!user.login || !user.password || !user.nameFirst || !user.nameLast) {
      throw new HTTP_ERROR_DICTIONARY.ConflictException(
        `Обязательный данные у пользователя отсуствуют, данные: ${JSON.stringify(user)}`
      ).getResponse();
    }

    try {
      return await this.userPostgresDb.createUser(user);
    } catch {
      throw new HTTP_ERROR_DICTIONARY.ConflictException("Такой пользователь уже есть в базе").getResponse();
    }
  }

  createUserWithMedia(user: User, file: Express.Multer.File) {
    return this.userPostgresDb.createUserWithMedia(user, file);
  }

  getUsers(query: Record<"search", string>) {
    return this.userPostgresDb.getUsers(query);
  }

  deleteUser(idOrLogin: string) {
    return this.userPostgresDb.deleteUser(idOrLogin);
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
  updateUser(id: string, body: IUserRequest) {
    try {
      return this.userPostgresDb.updateUser(id, body);
    } catch (err) {
      /**
       * Мой установленный констрэйнт на валидацию названий модели в БД
       * CONSTRAINT model_germany_check CHECK ("model" = 'vw' OR "model" = 'bmw' OR "model" = 'mercedes')
       * */
      if (err.constraint === "model_germany_check") {
        throw new HTTP_ERROR_DICTIONARY.ConflictException("Не прошло валидацию значения model в БД").getResponse();
      } else {
        throw new HTTP_ERROR_DICTIONARY.BadRequestException("Ошибка в процессе обновления", err);
      }
    }
  }

  getAllRoles() {
    return this.userPostgresDb.getAllRoles();
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
  updatePhotos(id: string, files: Express.Multer.File[]) {
    return this.userPostgresDb.updatePhotos(id, files);
  }
}
