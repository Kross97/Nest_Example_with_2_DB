"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMongoService = void 0;
// @ts-nocheck
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const mongodb_connector_1 = require("../../../../db-source/mongodb.connector");
const httpErrorDictionary_1 = require("../../../../common/constants/httpErrorDictionary");
const replaceMongoIdField_1 = require("../../../../common/utils/replaceMongoIdField");
const mongodb_service_1 = require("../../../../db-source/mongodb.service");
let UserMongoService = class UserMongoService {
    mongoDbService;
    userCollection;
    constructor(mongoDbService) {
        this.mongoDbService = mongoDbService;
        this.userCollection = this.mongoDbService.getMongoCollection("users");
    }
    async createUser(user) {
        if (!user.login || !user.password || !user.nameFirst || !user.nameLast) {
            throw new httpErrorDictionary_1.HTTP_ERROR_DICTIONARY.ConflictException(`Обязательный данные у пользователя отсуствуют, данные: ${JSON.stringify(user)}`).getResponse();
        }
        const userExist = await this.userCollection.findOne({ login: user.login });
        if (!userExist) {
            const result = await this.userCollection.insertOne(user);
            return result;
        }
        throw new httpErrorDictionary_1.HTTP_ERROR_DICTIONARY.ConflictException("Такой пользователь уже есть в базе").getResponse();
    }
    async updateUser(id, body) {
        const updateResult = await this.userCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
            $set: {
                login: body.login,
                password: body.password,
                nameFirst: body.nameFirst,
                nameLast: body.nameLast,
            },
        });
        return updateResult;
    }
    async getOneUser(id) {
        const { nameFirst, nameLast, ...user } = await this.userCollection.findOne({
            _id: new mongodb_1.ObjectId(id),
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
            pipeline.push({
                $set: {
                    product_mapping: { $first: "$product_mapping" },
                },
            }, {
                $set: {
                    product_name: "$product_mapping.name",
                    product_category: "$product_mapping.category",
                },
            });
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
        }
        finally {
            // await client.close();
        }
    }
    async deleteUser(idOrLogin) {
        return this.userCollection.deleteOne({ _id: new mongodb_1.ObjectId(idOrLogin) });
    }
    /**
     *
     * $or - аналог OR в SQL
     * $regex: `.*${query.search}.*` - аналог LIKE '%text%
     *
     * */
    async getUsers(query) {
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
        return (0, replaceMongoIdField_1.replaceMongoIdField)(listUsers).map(({ nameFirst, nameLast, ...user }) => ({
            name: { first: nameFirst, last: nameLast },
            ...user,
        }));
    }
};
UserMongoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(mongodb_connector_1.MARK_MONGO_PROVIDER)),
    __metadata("design:paramtypes", [mongodb_service_1.MongodbService])
], UserMongoService);
exports.UserMongoService = UserMongoService;
//# sourceMappingURL=user.mongo.service.js.map