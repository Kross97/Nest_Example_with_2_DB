"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPostgresDb = void 0;
const user_entity_1 = require("../../../../entities/user/user.entity");
const constants_1 = require("../../constants");
const fileToMediaEntity_1 = require("../../../../common/utils/fileToMediaEntity");
const MediaMaterials_entity_1 = require("../../../../entities/media_materials/MediaMaterials.entity");
const MediaBuffer_entity_1 = require("../../../../entities/media_materials/MediaBuffer.entity");
class UserPostgresDb {
  userRepository;
  carRepository;
  roleEntityRepository;
  mediaMaterialsEntityRepository;
  constructor(userRepository, carRepository, roleEntityRepository, mediaMaterialsEntityRepository) {
    this.userRepository = userRepository;
    this.carRepository = carRepository;
    this.roleEntityRepository = roleEntityRepository;
    this.mediaMaterialsEntityRepository = mediaMaterialsEntityRepository;
  }
  async createUserMock() {
    const user = await this.userRepository.save(constants_1.MOCK_USER);
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
  async getOneUser(id) {
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
  async createUser(user) {
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
    throw new Error("передать обработку ошибки сервису");
  }
  async createUserWithMedia(user, file) {
    user.mediaMaterials = [(0, fileToMediaEntity_1.fileToMediaEntityPostgres)(file)];
    await this.userRepository.save(user);
    return { status: "ПОЛЬЗОВАТЕЛЬ_С_FORM_DATA_PHOTO_СОЗДАН", user };
  }
  getUsers(query) {
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
  async deleteUser(idOrLogin) {
    await this.userRepository
      .createQueryBuilder()
      .delete()
      .from(user_entity_1.User)
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
  async updateUser(id, body) {
    // eslint-disable-next-line no-useless-catch
    try {
      let newCar = null;
      const currentUser = await this.userRepository.findOneBy({ id });
      if (body.car) {
        newCar = await this.carRepository.save({ user: currentUser, model: body.car.model });
      }
      const updatedUSer = await this.userRepository.update(id, {
        name: { last: body.nameLast, first: body.nameFirst },
        login: body.login,
        password: body.password,
        role: body.role,
        car: newCar,
      });
      return { status: "Пользователь_обновлен", updatedUSer };
    } catch (err) {
      throw err;
    }
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
  async updatePhotos(id, files) {
    const currentUser = await this.userRepository.findOneBy({ id });
    const mediaMaterials = files.map((file) => {
      const mediaEntity = new MediaMaterials_entity_1.MediaMaterialsEntity();
      mediaEntity.user = currentUser;
      mediaEntity.mimeType = file.mimetype;
      mediaEntity.size = file.size;
      mediaEntity.name = file.originalname;
      const buffer = new MediaBuffer_entity_1.MediaBufferEntity();
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
exports.UserPostgresDb = UserPostgresDb;
