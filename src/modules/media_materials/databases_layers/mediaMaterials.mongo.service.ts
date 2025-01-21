// @ts-nocheck
import { Inject, Injectable } from "@nestjs/common";
import { Collection, ObjectId } from "mongodb";
import { MARK_MONGO_PROVIDER } from "../../../db-source/mongodb.connector";
import { MongodbService } from "../../../db-source/mongodb.service";
import { fileToMediaEntityMongo } from "../../../common/utils/fileToMediaEntity";

@Injectable()
export class MediaMaterialsMongoService {
  static mediaMaterialsCollections = "mediaMaterials";

  static mediaMaterialsBufferCollections = "mediaMaterialsBuffer";

  private mediaMaterialsCollection: Collection<any>;

  private mediaMaterialsBufferCollection: Collection<any>;

  constructor(@Inject(MARK_MONGO_PROVIDER) private mongoService: MongodbService) {
    this.mediaMaterialsCollection = this.mongoService.getMongoCollection(MediaMaterialsMongoService.mediaMaterialsCollections);
    this.mediaMaterialsBufferCollection = this.mongoService.getMongoCollection(MediaMaterialsMongoService.mediaMaterialsBufferCollections);
  }

  async createMedia(file: Express.Multer.File) {
    const { fileBuffer, fileData } = fileToMediaEntityMongo(file);
    const { insertedId: idBuffer } = await this.mediaMaterialsBufferCollection.insertOne(fileBuffer);
    const { insertedId: idFile } = await this.mediaMaterialsCollection.insertOne({ ...fileData, bufferId: idBuffer });

    return { fileId: idFile, bufferId: idBuffer };
  }

  getAll(query: Record<"search", string>) {
    const mediaCursor = this.mediaMaterialsCollection.aggregate([
      {
        $set: {
          id: "$_id",
        },
      },
      {
        $unset: ["bufferId", "_id"],
      },
    ]);
    return mediaCursor.toArray();
  }

  private async getPhotoBuffer(id: string, response: Response) {
    const buffer = await this.mediaMaterialsCollection.aggregate([
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: this.mediaMaterialsBufferCollection,
          localField: "bufferId",
          foreignField: "_id",
          as: "media_buffer_mapping",
        },
      },
      // {
      //   $set: {
      //     buffer: "$media_buffer_mapping.buffer",
      //   },
      // },
      {
        $unset: ["bufferId", "media_buffer_mapping"],
      },
    ]);

    for await (const document of buffer) {
      console.log(document);
    }
  }

  getPhotoBufferFirst(id: string, response: Response) {
    this.getPhotoBuffer(id, response);
  }

  getPhotoBufferSecond(id: string, response: Response) {
    this.getPhotoBuffer(id, response);
  }
}
