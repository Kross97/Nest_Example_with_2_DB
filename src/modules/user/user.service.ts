import { Injectable } from '@nestjs/common';
import { UserPostgresService } from './databases_layers/user.postgres.service';
import { UserMongoService } from './databases_layers/user.mongo.service';
import { Request } from 'express';
import { parsingFormData } from '../../common/utils/parsingFormData';
import { IUserRequest } from './types';
import { MediaMaterialsEntity } from '../../entities/media_materials/MediaMaterials.entity';
import { MediaBufferEntity } from '../../entities/media_materials/MediaBuffer.entity';

type MyInstanceType<T extends  new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any;
type TDispatcherServices = Record<'default' | 'mongo', MyInstanceType<typeof UserPostgresService>>;

export type TQueryDb = Record<'db', 'mongo' | 'default'>;

@Injectable()
export class UserService {
   private dispatcherServices = {} as TDispatcherServices;

   constructor(private userPostgresService: UserPostgresService, private userMongoService: UserMongoService) {
     this.dispatcherServices = {
       default: this.userPostgresService,
       mongo: this.userMongoService,
     } as TDispatcherServices;
   }

  async createUserCustomFormData(req: Request, query?: TQueryDb) {
    const parsedBody = await parsingFormData<Omit<IUserRequest, 'role' | 'mediaMaterials' | 'car'> & {
      file: { fileName: string; mimeType: string; buffer: Buffer }[]
    }>(req);

    const userData = {
      nameFirst: parsedBody.nameFirst,
        nameLast: parsedBody.nameLast,
      login: parsedBody.login,
      password: parsedBody.password,
      mediaMaterials: parsedBody.file ? parsedBody.file.map((file) => {
      const media = new MediaMaterialsEntity();
      const mediaBuffer = new MediaBufferEntity();

      mediaBuffer.buffer = { data: file.buffer };

      media.buffer = mediaBuffer;
      media.name = file.fileName;
      media.mimeType = file.mimeType;
      media.size = file.buffer.length;
      return media;
    }) : null,
    }

    return this.call('createUser', [userData], query)
  }

   call<M extends keyof TDispatcherServices['default']>(method: M, params?: Parameters<TDispatcherServices['default'][M]>, queryParam?: TQueryDb) {
     const typeService = queryParam?.db || 'default';
     return this.dispatcherServices[typeService][method](...(params || []));
   }
}