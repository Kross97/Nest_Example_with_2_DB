// @ts-nocheck
import { Inject, Injectable } from "@nestjs/common";
import { Collection, ObjectId } from "mongodb";
import { IUserRequest } from "../../types";
import { MARK_MONGO_PROVIDER } from "../../../../db-source/mongodb.connector";
import { HTTP_ERROR_DICTIONARY } from "../../../../common/constants/httpErrorDictionary";
import { replaceMongoIdField } from "../../../../common/utils/replaceMongoIdField";
import { MongodbService } from "../../../../db-source/mongodb.service";

export interface IUserMongo {
  _id: ObjectId;
  nameFirst: string;
  nameLast: string;
  login: string;
  password: string;
}

@Injectable()
export class UserMongoService {
  private userCollection: Collection<IUserMongo>;

  constructor(@Inject(MARK_MONGO_PROVIDER) private mongoDbService: MongodbService) {
    this.userCollection = this.mongoDbService.getMongoCollection<IUserMongo>("users");
  }

  async createUser(user: IUserRequest) {
    if (!user.login || !user.password || !user.nameFirst || !user.nameLast) {
      throw new HTTP_ERROR_DICTIONARY.ConflictException(
        `Обязательный данные у пользователя отсуствуют, данные: ${JSON.stringify(user)}`
      ).getResponse();
    }

    const userExist = await this.userCollection.findOne({ login: user.login });

    if (!userExist) {
      const result = await this.userCollection.insertOne(user as IUserMongo);
      return result;
    }
    throw new HTTP_ERROR_DICTIONARY.ConflictException("Такой пользователь уже есть в базе").getResponse();
  }

  async updateUser(id: string, body: IUserRequest) {
    const updateResult = await this.userCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          login: body.login,
          password: body.password,
          nameFirst: body.nameFirst,
          nameLast: body.nameLast,
        },
      }
    );
    return updateResult;
  }

  async getOneUser(id: string) {
    const { nameFirst, nameLast, ...user } = await this.userCollection.findOne({
      _id: new ObjectId(id),
    });
    return {
      ...user,
      name: {
        first: nameFirst,
        last: nameLast,
      },
    };
  }

  /**
   * Пример создание связи один-ко-дному в Монго
   * */
  async exampleLookup() {
    try {
      const ordersColl = this.mongoDbService.getMongoCollection("orders");
      const productsColl = this.mongoDbService.getMongoCollection("products");
      await ordersColl.deleteMany({});

      const orderData = [
        {
          customer_id: "elise_smith@myemail.com",
          orderdate: new Date("2020-05-30T08:35:52Z"),
          product_id: "a1b2c3d4",
          value: 431.43,
        },
        {
          customer_id: "tj@wheresmyemail.com",
          orderdate: new Date("2019-05-28T19:13:32Z"),
          product_id: "z9y8x7w6",
          value: 5.01,
        },
        {
          customer_id: "oranieri@warmmail.com",
          orderdate: new Date("2020-01-01T08:25:37Z"),
          product_id: "ff11gg22hh33",
          value: 63.13,
        },
        {
          customer_id: "jjones@tepidmail.com",
          orderdate: new Date("2020-12-26T08:55:46Z"),
          product_id: "a1b2c3d4",
          value: 429.65,
        },
      ];

      await ordersColl.insertMany(orderData);
      // end-insert-orders

      // start-insert-products
      await productsColl.deleteMany({});

      const productData = [
        {
          id: "a1b2c3d4",
          name: "Asus Laptop",
          category: "ELECTRONICS",
          description: "Good value laptop for students",
        },
        {
          id: "z9y8x7w6",
          name: "The Day Of The Triffids",
          category: "BOOKS",
          description: "Classic post-apocalyptic novel",
        },
        {
          id: "ff11gg22hh33",
          name: "Morphy Richardds Food Mixer",
          category: "KITCHENWARE",
          description: "Luxury mixer turning good cakes into great",
        },
        {
          id: "pqr678st",
          name: "Karcher Hose Set",
          category: "GARDEN",
          description: "Hose + nosels + winder for tidy storage",
        },
      ];

      await productsColl.insertMany(productData);
      // end-insert-products

      const pipeline = [];

      // start-match
      pipeline.push({
        $match: {
          orderdate: {
            $gte: new Date("2020-01-01T00:00:00Z"),
            $lt: new Date("2021-01-01T00:00:00Z"),
          },
        },
      });
      // end-match

      // start-lookup
      pipeline.push({
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "id",
          as: "product_mapping",
        },
      });
      // end-lookup

      // start-set
      pipeline.push(
        {
          $set: {
            product_mapping: { $first: "$product_mapping" },
          },
        },
        {
          $set: {
            product_name: "$product_mapping.name",
            product_category: "$product_mapping.category",
          },
        }
      );
      // end-set

      // start-unset
      // pipeline.push({ $unset: ["_id", "product_id", "product_mapping"] });
      // end-unset

      // start-run-agg
      const aggregationResult = await ordersColl.aggregate(pipeline);
      // end-run-agg

      for await (const document of aggregationResult) {
        console.log(document);
      }
    } finally {
      // await client.close();
    }
  }

  async deleteUser(idOrLogin: string) {
    return this.userCollection.deleteOne({ _id: new ObjectId(idOrLogin) });
  }

  /**
   *
   * $or - аналог OR в SQL
   * $regex: `.*${query.search}.*` - аналог LIKE '%text%
   *
   * */
  async getUsers(query: Record<"search", string>) {
    // this.exampleLookup();
    const users = this.userCollection.find({
      $or: [
        {
          nameFirst: { $regex: `.*${query.search}.*` },
        },
        {
          nameLast: { $regex: `.*${query.search}.*` },
        },
        {
          login: { $regex: `.*${query.search}.*` },
        },
      ],
    });
    const listUsers = await users.toArray();

    return replaceMongoIdField(listUsers).map(({ nameFirst, nameLast, ...user }) => ({
      name: { first: nameFirst, last: nameLast },
      ...user,
    }));
  }
}
