import "reflect-metadata";

import { Request, Response } from "express";
import { TypeOrmDataSource } from "$nest_project_db_source";
import { User } from "$nest_project/entities/user/user.entity";
import { Car } from "$nest_project/entities/car/car.entity";
import { RoleEntity } from "$nest_project/entities/user/role.entity";

import { MediaMaterialsEntity } from "$nest_project/entities/media_materials/MediaMaterials.entity";
import { UserPostgresDb } from "$nest_project/userDb";

class UserPostgresServiceClass {
  private userPostgresDb: UserPostgresDb;

  constructor() {
    const userRepository = TypeOrmDataSource.getRepository(User);
    const carRepository = TypeOrmDataSource.getRepository(Car);
    const roleRepository = TypeOrmDataSource.getRepository(RoleEntity);
    const mediaMaterialsEntity = TypeOrmDataSource.getRepository(MediaMaterialsEntity);
    this.userPostgresDb = new UserPostgresDb(userRepository, carRepository, roleRepository, mediaMaterialsEntity);
    console.log("this.userPostgresDb =>", this.userPostgresDb);
  }

  // createUserMock(response: Response) {
  //   return this.userPostgresDb.createUserMock();
  // }
  //
  // refreshUserData(response: Response) {
  //   return this.userPostgresDb.refreshUserData();
  // }
  //
  // getOneUser(request: Request, response: Response) {
  //   return this.userPostgresDb.getOneUser(id);
  // }
  //
  // async createUser(request: Request, response: Response) {
  //   try {
  //     return await this.userPostgresDb.createUser(user);
  //   } catch {
  //     throw "";
  //   }
  // }
  //
  // createUserWithMedia(request: Request, response: Response) {
  //   return this.userPostgresDb.createUserWithMedia(user, file);
  // }

  async getUsers(request: Request, response: Response) {
    const query: Record<"search", string> = { search: (request.query.search as string) || "" };
    const users = await this.userPostgresDb.getUsers(query);
    response.send(users);
  }

  // deleteUser(request: Request, response: Response) {
  //   return this.userPostgresDb.deleteUser(idOrLogin);
  // }
  //
  // /**
  //  * Когда при обновлении данных которые уже есть в БД (в данном случае user) нужно прикрепить связанные данные
  //  * которых еще нет в БД (в данном случае car) , нужно создать связанные данные через .save()
  //  * а затем обновить главную сущность (через user -> update) с прикреплением связанных данных (car)
  //  *
  //  * -------------------------------------------------
  //  *
  //  * Если бы всех данных не было бы в БД , то метод .save() на главной сущности рекурсивно бы создал как
  //  * главную сущность (user) так и связанные сущности (car)
  //  * */
  // updateUser(request: Request, response: Response) {
  //   try {
  //     return this.userPostgresDb.updateUser(id, body);
  //   } catch (err) {
  //     /**
  //      * Мой установленный констрэйнт на валидацию названий модели в БД
  //      * CONSTRAINT model_germany_check CHECK ("model" = 'vw' OR "model" = 'bmw' OR "model" = 'mercedes')
  //      * */
  //     if (err.constraint === "model_germany_check") {
  //       throw "";
  //     } else {
  //       throw "";
  //     }
  //   }
  // }
  //
  // getAllRoles(response: Response) {
  //   return this.userPostgresDb.getAllRoles();
  // }
  //
  // /**
  //  * Сохранять массив новых данных (mediaMaterials) лучше через создание save
  //  * (this.mediaMaterialsEntityRepository.save(mediaMaterials)) и привязки их к user
  //  * в данном случае обновление на User через this.userRepository.update(id, { mediaMaterials }) не работает
  //  * показывает ошибку в добавлении при связи one-to-many
  //  *
  //  * Моя заметка: обновление через update работать не будет если связанные сущности
  //  * еще не были созданы в БД, а главная сущность (в данном случае user) уже созданна в БД
  //  * */
  // updatePhotos(request: Request, response: Response) {
  //   return this.userPostgresDb.updatePhotos(id, files);
  // }
}

export const UserPostgresService = new UserPostgresServiceClass();
