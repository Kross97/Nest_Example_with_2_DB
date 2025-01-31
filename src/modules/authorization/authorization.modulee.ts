import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthorizationService } from "./authorization.service";
import { AuthorizationController } from "./authorization.controller";
import { User } from "../../entities/user/user.entity";
import { ChildProcessClusterModule } from "../childProcess_cluster/childProcess_cluster.modulee";

// @Global() // Делает модуль глобальным , его внутренние сервисы могут инжектить все, без необходимости использовать imports в своих модулях
@Module({
  exports: [AuthorizationService], // exports чтобы данные сервисы могли импортироваться (инжектится) и в других модулях импортирующих текущий модуль
  imports: [TypeOrmModule.forFeature([User]), ChildProcessClusterModule],
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
})
export class AuthorizationModule {}
