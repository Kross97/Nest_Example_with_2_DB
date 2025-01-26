// @ts-nocheck
import { Injectable } from "@nestjs/common";
import { MediaMaterialsPostgresService } from "./databases_layers/mediaMaterials.postgres.service";
import { TQueryDb, TTypesDb } from "../../db-source/types/mongo";
import { MediaMaterialsMongoService } from "./databases_layers/mediaMaterials.mongo.service";

type MyInstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any;
type TDispatcherServices = Record<TTypesDb, MyInstanceType<typeof MediaMaterialsPostgresService>>;

@Injectable()
export class MediaMaterialsService {
  private dispatcherServices = {} as TDispatcherServices;

  constructor(
    private mediaMaterialsPostgresService: MediaMaterialsPostgresService,
    private mediaMaterialsMongoService: MediaMaterialsMongoService
  ) {
    this.dispatcherServices = {
      postgres: this.mediaMaterialsPostgresService,
      mongo: this.mediaMaterialsMongoService,
    } as TDispatcherServices;
  }

  call<M extends keyof TDispatcherServices["postgres"]>(
    method: M,
    params?: Parameters<TDispatcherServices["postgres"][M]>,
    queryParam?: TQueryDb
  ) {
    const typeService = queryParam?.db || "postgres";
    return this.dispatcherServices[typeService][method](...(params || []));
  }
}
