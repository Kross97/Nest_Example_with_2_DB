import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Response } from "express";
import { IAuthRequest } from "./types";
import { User } from "../../entities/user/user.entity";
import { HTTP_ERROR_DICTIONARY } from "../../common/constants/httpErrorDictionary";
import { createJWTSignature } from "../../common/utils/createJWTSignature";
import { setCookieHandler } from "../../common/utils/setCookieHandler";
import { ClusterService } from "../childProcess_cluster/cluster.service";

@Injectable()
export class AuthorizationService {
  /**
   * Обьявлять переменные нужно здесь а не в конструкторе (при использовании декораторов на подобии @InjectRepository)
   * т.к будет ошибка решения зависимостей "Nest can't resolve dependencies...."
   * */
  private headJwt: { alg: string; typ: string };

  private minuteExp: number;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    // eslint-disable-next-line max-len
    private clusterService: ClusterService // private tokenKeyErr: string, // - раскоментить для теста ошибки "Nest can't resolve dependencies...."
  ) {
    this.headJwt = { alg: "HS256", typ: "jwt" };
    this.minuteExp = 40;
  }

  private buildJwtToken(user: User) {
    const dateExp = new Date();
    dateExp.setMinutes(dateExp.getMinutes() + this.minuteExp);

    const head = Buffer.from(JSON.stringify(this.headJwt)).toString("base64");
    const body = Buffer.from(
      JSON.stringify({
        login: user.login,
        password: user.password,
        roles: ["all"],
        expires: dateExp.toString(),
      })
    ).toString("base64");

    const signature = createJWTSignature(head, body);

    return {
      login: user.login,
      password: user.password,
      token: `${head}.${body}.${signature}`,
      currentPort: this.clusterService.getCurrentPort(),
    };
  }

  async signIn(body: IAuthRequest, response: Response) {
    response.setHeader("content-type", "application/json; charset=utf-8");

    if (!body.password || !body.login) {
      const error = new HTTP_ERROR_DICTIONARY.UnauthorizedException("Не указаны логин или пароль");
      response.status(error.getStatus());
      response.end(JSON.stringify(error.getResponse()));
      return;
    }

    const userExist = await this.userRepository.findOne({
      where: {
        login: body.login,
        password: body.password,
      },
      relations: {
        role: true,
      },
    });

    if (userExist) {
      setCookieHandler(response, "role", Buffer.from(JSON.stringify(userExist.role)).toString("base64"));
      response.end(JSON.stringify(this.buildJwtToken(userExist)));
    } else {
      const error = new HTTP_ERROR_DICTIONARY.UnauthorizedException("Данные о пользователе неккоректны. Такого пользователя нет в Базе");
      response.status(error.getStatus());
      response.end(JSON.stringify(error.getResponse()));
    }
  }
}
