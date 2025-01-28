import { Request, Response } from "express";
import { TypeOrmDataSource } from "$nest_project_db_source";
import { User } from "$nest_project/entities/user/user.entity";
import { Car } from "$nest_project/entities/car/car.entity";
import { RoleEntity } from "$nest_project/entities/user/role.entity";

import { MediaMaterialsEntity } from "$nest_project/entities/media_materials/MediaMaterials.entity";
import { UserPostgresDb } from "$nest_project/userDb";
import { IUserRequest } from "../../../src/modules/user/types";
import { HTTP_ERRORS, HttpErrors } from "../../common/classes/HttpErrors";

class UserPostgresServiceClass {
  private userPostgresDb: UserPostgresDb;

  constructor() {
    const userRepository = TypeOrmDataSource.getRepository(User);
    const carRepository = TypeOrmDataSource.getRepository(Car);
    const roleRepository = TypeOrmDataSource.getRepository(RoleEntity);
    const mediaMaterialsEntity = TypeOrmDataSource.getRepository(MediaMaterialsEntity);
    this.userPostgresDb = new UserPostgresDb(userRepository, carRepository, roleRepository, mediaMaterialsEntity);
  }

  async createUserMock(response: Response) {
    const userMock = await this.userPostgresDb.createUserMock();
    response.send(userMock);
  }

  async refreshUserData(response: Response) {
    await this.userPostgresDb.refreshUserData();
    response.send("refresh_success");
  }

  async getOneUser(request: Request, response: Response) {
    const user = await this.userPostgresDb.getOneUser(request.params.id);
    response.send(user);
  }

  async createUser(request: Request<any, any, IUserRequest>, response: Response) {
    try {
      const createdUser = await this.userPostgresDb.createUser(request.body);
      response.send(createdUser);
    } catch {
      response.statusCode = 400;
      response.send("Ошибка создания пользователя");
    }
  }

  createUserWithMedia(request: Request, response: Response) {
    return this.userPostgresDb.createUserWithMedia(user, file);
  }

  async getUsers(request: Request, response: Response) {
    const query: Record<"search", string> = { search: (request.query.search as string) || "" };
    const users = await this.userPostgresDb.getUsers(query);
    response.send(users);
  }

  async deleteUser(request: Request, response: Response) {
    const deleted = await this.userPostgresDb.deleteUser(request.params.id);
    response.send(deleted);
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
  updateUser(request: Request, response: Response) {
    try {
      const updated = this.userPostgresDb.updateUser(request.params.id, request.body);
      response.send(updated);
    } catch (err) {
      /**
       * Мой установленный констрэйнт на валидацию названий модели в БД
       * CONSTRAINT model_germany_check CHECK ("model" = 'vw' OR "model" = 'bmw' OR "model" = 'mercedes')
       * */
      if (err.constraint === "model_germany_check") {
        HTTP_ERRORS.throwBadGatewayException(response, "Ошибка ограничения model_germany_check");
      } else {
        HTTP_ERRORS.throwBadGatewayException(response, "Ошибка");
      }
    }
  }

  async getAllRoles(response: Response) {
    const allRoles = await this.userPostgresDb.getAllRoles();
    response.send(allRoles);
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
  async updatePhotos(request: Request, response: Response) {
    const updated = await this.userPostgresDb.updatePhotos(request.params.id, request.files);
    response.send(updated);
  }
}

export const UserPostgresService = new UserPostgresServiceClass();
