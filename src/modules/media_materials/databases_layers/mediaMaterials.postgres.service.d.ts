/// <reference types="multer" />
import { Repository } from "typeorm";
import { Response } from "express";
import { MediaMaterialsEntity } from "../../../entities/media_materials/MediaMaterials.entity";
export declare class MediaMaterialsPostgresService {
    private mediaMaterialsRepository;
    constructor(mediaMaterialsRepository: Repository<MediaMaterialsEntity>);
    createMedia(file: Express.Multer.File): Promise<{
        status: string;
        file: MediaMaterialsEntity;
    }>;
    createMediaMany(files: Express.Multer.File[]): Promise<{
        status: string;
        files: MediaMaterialsEntity[];
    }>;
    getAll(query: Record<"search", string>): Promise<MediaMaterialsEntity[]>;
    getPhotoBufferFirst(id: string, response: Response): Promise<void>;
    getPhotoBufferSecond(id: string, response: Response): Promise<void>;
}
//# sourceMappingURL=mediaMaterials.postgres.service.d.ts.map