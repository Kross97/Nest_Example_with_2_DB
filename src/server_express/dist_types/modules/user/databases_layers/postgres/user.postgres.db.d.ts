/// <reference types="multer" />
import { Repository } from "typeorm";
import { User } from "../../../../entities/user/user.entity";
import { IUserRequest } from "../../types";
import { Car } from "../../../../entities/car/car.entity";
import { MediaMaterialsEntity } from "../../../../entities/media_materials/MediaMaterials.entity";
import { RoleEntity } from "../../../../entities/user/role.entity";
export declare class UserPostgresDb {
    private readonly userRepository;
    private readonly carRepository;
    private readonly roleEntityRepository;
    private readonly mediaMaterialsEntityRepository;
    constructor(userRepository: Repository<User>, carRepository: Repository<Car>, roleEntityRepository: Repository<RoleEntity>, mediaMaterialsEntityRepository: Repository<MediaMaterialsEntity>);
    createUserMock(): Promise<import("typeorm").DeepPartial<User>[]>;
    refreshUserData(): Promise<void>;
    getOneUser(id: string): Promise<User | null>;
    createUser(user: IUserRequest): Promise<{
        status: string;
        userSaved: import("typeorm").DeepPartial<User>[];
    }>;
    createUserWithMedia(user: User, file: Express.Multer.File): Promise<{
        status: string;
        user: User;
    }>;
    getUsers(query: Record<"search", string>): Promise<User[]>;
    deleteUser(idOrLogin: string): Promise<string>;
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
    updateUser(id: string, body: IUserRequest): Promise<{
        status: string;
        updatedUSer: import("typeorm").UpdateResult;
    }>;
    getAllRoles(): Promise<RoleEntity[]>;
    /**
     * Сохранять массив новых данных (mediaMaterials) лучше через создание save
     * (this.mediaMaterialsEntityRepository.save(mediaMaterials)) и привязки их к user
     * в данном случае обновление на User через this.userRepository.update(id, { mediaMaterials }) не работает
     * показывает ошибку в добавлении при связи one-to-many
     *
     * Моя заметка: обновление через update работать не будет если связанные сущности
     * еще не были созданы в БД, а главная сущность (в данном случае user) уже созданна в БД
     * */
    updatePhotos(id: string, files: Express.Multer.File[]): Promise<{
        status: string;
    }>;
}
//# sourceMappingURL=user.postgres.db.d.ts.map