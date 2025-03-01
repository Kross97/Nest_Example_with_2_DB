import { Module } from "@nestjs/common";
import { ChildProcessService } from "./childProcess.service";
import { ChildProcessClusterController } from "./childProcess_cluster.controller";
import { ClusterService } from "./cluster.service";

@Module({
  exports: [ClusterService], // exports чтобы данные сервисы могли импортироваться (инжектится) и в других модулях импортирующих текущий модуль
  imports: [],
  controllers: [ChildProcessClusterController],
  providers: [ChildProcessService, ClusterService],
})
export class ChildProcessClusterModule {}
