/// <reference types="multer" />
import { ObjectId } from "mongodb";
import { MongodbService } from "../../../db-source/mongodb.service";
export declare class MediaMaterialsMongoService {
    private mongoService;
    static mediaMaterialsCollections: string;
    static mediaMaterialsBufferCollections: string;
    private mediaMaterialsCollection;
    private mediaMaterialsBufferCollection;
    constructor(mongoService: MongodbService);
    createMedia(file: Express.Multer.File): Promise<{
        fileId: ObjectId;
        bufferId: ObjectId;
    }>;
    getAll(query: Record<"search", string>): Promise<import("bson").Document[]>;
    private getPhotoBuffer;
    getPhotoBufferFirst(id: string, response: Response): void;
    getPhotoBufferSecond(id: string, response: Response): void;
}
//# sourceMappingURL=mediaMaterials.mongo.service.d.ts.map