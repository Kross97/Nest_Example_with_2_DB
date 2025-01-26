import { MediaMaterialsEntity } from "../../../entities/media_materials/MediaMaterials.entity";
export interface IUserRequest {
    nameFirst: string;
    nameLast: string;
    password: string;
    login: string;
    role?: {
        id: number;
        role: string;
    };
    car?: {
        model: string;
    };
    mediaMaterials?: MediaMaterialsEntity[];
}
//# sourceMappingURL=index.d.ts.map