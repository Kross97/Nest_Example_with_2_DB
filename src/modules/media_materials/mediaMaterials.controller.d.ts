/// <reference types="multer" />
import { Response } from "express";
import { MediaMaterialsService } from "./mediaMaterials.service";
import { TQueryDb } from "../../db-source/types/mongo";
export declare class MediaMaterialsController {
    private readonly mediaMaterialsService;
    constructor(mediaMaterialsService: MediaMaterialsService);
    create(file: Express.Multer.File, query: TQueryDb): Promise<void> | Promise<import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity[]> | Promise<{
        status: string;
        file: import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity;
    }> | Promise<{
        status: string;
        files: import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity[];
    }>;
    createMany(files: Express.Multer.File[]): Promise<void> | Promise<import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity[]> | Promise<{
        status: string;
        file: import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity;
    }> | Promise<{
        status: string;
        files: import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity[];
    }>;
    getAll(query: Record<"search", string> & TQueryDb): Promise<void> | Promise<import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity[]> | Promise<{
        status: string;
        file: import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity;
    }> | Promise<{
        status: string;
        files: import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity[];
    }>;
    getPhotoBuffer(id: string, response: Response, query: TQueryDb): Promise<void> | Promise<import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity[]> | Promise<{
        status: string;
        file: import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity;
    }> | Promise<{
        status: string;
        files: import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity[];
    }>;
    getPhotoBlob(id: string, response: Response, query: TQueryDb): Promise<void> | Promise<import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity[]> | Promise<{
        status: string;
        file: import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity;
    }> | Promise<{
        status: string;
        files: import("../../entities/media_materials/MediaMaterials.entity").MediaMaterialsEntity[];
    }>;
}
//# sourceMappingURL=mediaMaterials.controller.d.ts.map