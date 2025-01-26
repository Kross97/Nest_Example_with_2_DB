import { MediaMaterialsPostgresService } from "./databases_layers/mediaMaterials.postgres.service";
import { TQueryDb, TTypesDb } from "../../db-source/types/mongo";
import { MediaMaterialsMongoService } from "./databases_layers/mediaMaterials.mongo.service";
type MyInstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any;
type TDispatcherServices = Record<TTypesDb, MyInstanceType<typeof MediaMaterialsPostgresService>>;
export declare class MediaMaterialsService {
    private mediaMaterialsPostgresService;
    private mediaMaterialsMongoService;
    private dispatcherServices;
    constructor(mediaMaterialsPostgresService: MediaMaterialsPostgresService, mediaMaterialsMongoService: MediaMaterialsMongoService);
    call<M extends keyof TDispatcherServices["postgres"]>(method: M, params?: Parameters<TDispatcherServices["postgres"][M]>, queryParam?: TQueryDb): Promise<void> | Promise<import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity[]> | Promise<{
        status: string;
        file: import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity;
    }> | Promise<{
        status: string;
        files: import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity[];
    }>;
}
export {};
//# sourceMappingURL=mediaMaterials.service.d.ts.map