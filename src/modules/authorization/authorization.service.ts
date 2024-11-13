import { Injectable } from '@nestjs/common';
import { IAuthRequest } from './types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user/user.entity';
import { Repository } from 'typeorm';
import { HTTP_ERROR_DICTIONARY } from '../../common/constants/httpErrorDictionary';
import { createHmac } from 'crypto';
import { createJWTSignature } from '../../common/utils/createJWTSignature';

@Injectable()
export class AuthorizationService {
  /**
   * Обьявлять переменные нужно здесь а не в конструкторе (при использовании декораторов на подобии @InjectRepository)
   * т.к будет ошибка решения зависимостей "Nest can't resolve dependencies...."
   * */
  private tokenKey: string;
  private headJwt: { alg: string, typ: string };
  private minuteExp: number;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    // private tokenKeyErr: string, // - раскоментить для теста ошибки "Nest can't resolve dependencies...."
  ) {
    this.headJwt = { alg: 'HS256', typ: 'jwt' };
    this.minuteExp = 2;
  }

  private buildJwtToken(user: User) {
    const dateExp = new Date();
    dateExp.setMinutes(dateExp.getMinutes() + this.minuteExp);

    const head = Buffer.from(JSON.stringify(this.headJwt)).toString('base64');
    const body = Buffer.from(JSON.stringify({
      login: user.login,
      password: user.password,
      roles: ['all'],
      expires: dateExp.toString(),
    })).toString('base64');


    const signature = createJWTSignature(head, body)

    return { login: user.login, password: user.password, token: `${head}.${body}.${signature}` };
  }

  async signIn(body: IAuthRequest) {
    console.log('body =>', body);
    const userExist = await this.userRepository.findOne({
      where: {
        login: body.login,
        password: body.password,
      },
    });

    if (userExist) {
      return this.buildJwtToken(userExist);
    }
    return new HTTP_ERROR_DICTIONARY.UnauthorizedException('Данные о пользователе неккоректны');
  }
}
