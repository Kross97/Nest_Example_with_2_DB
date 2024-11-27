import { Module } from '@nestjs/common';
import { ChildProcessService } from './childProcess.service';
import { ChildProcessClusterController } from './childProcess_cluster.controller';
import {ClusterService} from "./cluster.service";

@Module({
  imports: [],
  controllers: [ChildProcessClusterController],
  providers: [ChildProcessService, ClusterService],
})
export class ChildProcessClusterModule {}