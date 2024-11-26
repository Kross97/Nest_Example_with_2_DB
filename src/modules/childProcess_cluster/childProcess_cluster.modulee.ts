import { Module } from '@nestjs/common';
import { ChildProcessService } from './childProcess.service';
import { ChildProcessClusterController } from './childProcess_cluster.controller';

@Module({
  imports: [],
  controllers: [ChildProcessClusterController],
  providers: [ChildProcessService],
})
export class ChildProcessClusterModule {}