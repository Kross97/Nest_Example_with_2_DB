import {
  Controller, Get, Res,
} from '@nestjs/common';
import { ChildProcessService } from './childProcess.service';
import { ClusterService } from './cluster.service';
import { Response } from 'express';

@Controller('childProcess_cluster')
export class ChildProcessClusterController {
  constructor(private childProcessService: ChildProcessService, private clusterService: ClusterService) {
  }

  //Не работает!
  @Get('exec_docker')
  getExecDocker() {
    return this.childProcessService.enterInDockerContainer();
  }

  @Get('exec_busy_ports')
  getBusyPorts(@Res() response) {
    return this.childProcessService.getBusySystemPorts(response);
  }

  @Get('child_process_exec')
  getChildProcessExec() {
    return this.childProcessService.getChildProcessExec();
  }

  @Get('child_process_spawn')
  getChildProcessSpawn() {
    return this.childProcessService.getChildProcessSpawn();
  }

  @Get('child_process_fork')
  async getChildProcessFork() {
    return this.childProcessService.getChildProcessFork();
  }

  @Get('cluster_enable')
  async startClustersFork() {
    return this.clusterService.startClustersFork();
  }

  @Get('cluster_ports')
  async getClusterPorts(@Res() response: Response) {
    return this.clusterService.getClustersPortData(response);
  }

  @Get('cluster_exit')
  async exitClustersFork(@Res() response: Response) {
    return this.clusterService.exitClusterForks(response);
  }
}