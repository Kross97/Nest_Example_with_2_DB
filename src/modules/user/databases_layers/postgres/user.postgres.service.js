"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPostgresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
// @ts-ignore
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../../../entities/user/user.entity");
const car_entity_1 = require("../../../../entities/car/car.entity");
const httpErrorDictionary_1 = require("../../../../common/constants/httpErrorDictionary");
const role_entity_1 = require("../../../../entities/user/role.entity");
const MediaMaterials_entity_1 = require("../../../../entities/media_materials/MediaMaterials.entity");
const user_postgres_db_1 = require("./user.postgres.db");
let UserPostgresService = class UserPostgresService {
    userRepository;
    carRepository;
    roleEntityRepository;
    mediaMaterialsEntityRepository;
    userPostgresDb;
    constructor(userRepository, carRepository, roleEntityRepository, mediaMaterialsEntityRepository) {
        this.userRepository = userRepository;
        this.carRepository = carRepository;
        this.roleEntityRepository = roleEntityRepository;
        this.mediaMaterialsEntityRepository = mediaMaterialsEntityRepository;
        this.userPostgresDb = new user_postgres_db_1.UserPostgresDb(this.userRepository, this.carRepository, this.roleEntityRepository, this.mediaMaterialsEntityRepository);
    }
    createUserMock() {
        return this.userPostgresDb.createUserMock();
    }
    refreshUserData() {
        return this.userPostgresDb.refreshUserData();
    }
    getOneUser(id) {
        return this.userPostgresDb.getOneUser(id);
    }
    async createUser(user) {
        if (!user.login || !user.password || !user.nameFirst || !user.nameLast) {
            throw new httpErrorDictionary_1.HTTP_ERROR_DICTIONARY.ConflictException(`Обязательный данные у пользователя отсуствуют, данные: ${JSON.stringify(user)}`).getResponse();
        }
        try {
            return await this.userPostgresDb.createUser(user);
        }
        catch {
            throw new httpErrorDictionary_1.HTTP_ERROR_DICTIONARY.ConflictException("Такой пользователь уже есть в базе").getResponse();
        }
    }
    createUserWithMedia(user, file) {
        return this.userPostgresDb.createUserWithMedia(user, file);
    }
    getUsers(query) {
        return this.userPostgresDb.getUsers(query);
    }
    deleteUser(idOrLogin) {
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
    updateUser(id, body) {
        try {
            return this.userPostgresDb.updateUser(id, body);
        }
        catch (err) {
            /**
             * Мой установленный констрэйнт на валидацию названий модели в БД
             * CONSTRAINT model_germany_check CHECK ("model" = 'vw' OR "model" = 'bmw' OR "model" = 'mercedes')
             * */
            if (err.constraint === "model_germany_check") {
                throw new httpErrorDictionary_1.HTTP_ERROR_DICTIONARY.ConflictException("Не прошло валидацию значения model в БД").getResponse();
            }
            else {
                throw new httpErrorDictionary_1.HTTP_ERROR_DICTIONARY.BadRequestException("Ошибка в процессе обновления", err);
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
    updatePhotos(id, files) {
        return this.userPostgresDb.updatePhotos(id, files);
    }
};
UserPostgresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(car_entity_1.Car)),
    __param(2, (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(MediaMaterials_entity_1.MediaMaterialsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserPostgresService);
exports.UserPostgresService = UserPostgresService;
//# sourceMappingURL=user.postgres.service.js.map