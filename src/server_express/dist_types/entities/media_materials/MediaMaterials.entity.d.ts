import { User } from "../user/user.entity";
import { MediaBufferEntity } from "./MediaBuffer.entity";
export declare class MediaMaterialsEntity {
    id: number;
    name: string;
    size: number;
    mimeType: string;
    buffer: MediaBufferEntity;
    user: User;
    createdAt: Date;
}
//# sourceMappingURL=MediaMaterials.entity.d.ts.map