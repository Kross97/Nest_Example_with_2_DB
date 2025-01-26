/// <reference types="express-serve-static-core" />
/// <reference types="multer" />
/// <reference types="node" />
/// <reference types="node" />
import { MediaMaterialsEntity } from "../../entities/media_materials/MediaMaterials.entity";
export declare const fileToMediaEntityPostgres: (file: Express.Multer.File) => MediaMaterialsEntity;
export declare const fileToMediaEntityMongo: (file: Express.Multer.File) => {
    fileData: {
        mimeType: string;
        name: string;
        size: number;
    };
    fileBuffer: {
        buffer: Buffer;
    };
};
//# sourceMappingURL=fileToMediaEntity.d.ts.map