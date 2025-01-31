/**

 Охраники нужны для логики проверки определяющей пропускать запрос дальше или заблокировать и "развернуть" его с
 ошибкой клиенту (проверка токенов, ролевой безопасности и т.д)

 1. Методы подключения Охраников

     1.1. на контроллеры

     @UseGuards(RolesGuard)
     export class CatsController {}

     1.2. на методы

     @Post('signIn')
     @UseGuards(RolesGuard)
     signIn(@Body() body: IAuthRequest) {
        return this.authorizationService.signIn(body);
      }

     1.3. глобально
        app.useGlobalGuards(new RolesGuard());

        или в модуль глобально

         import { Module } from '@nestjs/common';
         import { APP_GUARD } from '@nestjs/core';

         @Module({
          providers: [
            {
              provide: APP_GUARD,
              useClass: RolesGuard,
            },
          ],
        })
         export class AppModule {}


   2. Возврат из охраника идет только true или false

       2.1. при возврате true запрос идет дальше

       2.2. при возврате false клиенту возвращается ответ :

             {
              "statusCode": 403,
              "message": "Forbidden resource",
              "error": "Forbidden"
            }

       2.2.1 чтобы переопределить ответ при ошибке нужно бросить исколючение, пример:

           throw new UnauthorizedException();
*/
