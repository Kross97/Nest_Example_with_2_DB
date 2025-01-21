// @ts-nocheck
import { Inject, Injectable } from "@nestjs/common";
import { Collection, ObjectId } from "mongodb";
import { MARK_MONGO_PROVIDER } from "../../../db-source/mongodb.connector";
import { MongodbService } from "../../../db-source/mongodb.service";
import { fileToMediaEntityMongo } from "../../../common/utils/fileToMediaEntity";

@Injectable()
export class MediaMaterialsMongoService {
  private mediaMaterialsCollection: Collection<any>;

  private mediaMaterialsBufferCollection: Collection<any>;

  constructor(@Inject(MARK_MONGO_PROVIDER) private mongoService: MongodbService) {
    this.mediaMaterialsCollection = this.mongoService.getMongoCollection("mediaMaterials");
    this.mediaMaterialsBufferCollection = this.mongoService.getMongoCollection("mediaMaterialsBuffer");
  }

  async createMedia(file: Express.Multer.File) {
    const { fileBuffer, fileData } = fileToMediaEntityMongo(file);
    const { insertedId: idBuffer } = await this.mediaMaterialsBufferCollection.insertOne(fileBuffer);
    const { insertedId: idFile } = await this.mediaMaterialsCollection.insertOne({ ...fileData, bufferId: idBuffer });

    return { fileId: idFile, bufferId: idBuffer };
  }

  getAll(query: Record<"search", string>) {
    const mediaCursor = this.mediaMaterialsCollection.find();
    return mediaCursor.toArray();
  }
}
