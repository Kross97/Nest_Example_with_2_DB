import {

    Controller, Get,
} from '@nestjs/common';
import {ChildProcessService} from "./childProcess.service";
import {ClusterService} from "./cluster.service";

@Controller('childProcess_cluster')
export class ChildProcessClusterController {
    constructor(private childProcessService: ChildProcessService, private clusterService: ClusterService) {
    }

    @Get('child_process_exec')
    getChildProcessExec() {
        return this.childProcessService.getChildProcessExec()
    }

    @Get('child_process_spawn')
    getChildProcessSpawn() {
        return this.childProcessService.getChildProcessSpawn();
    }

    @Get('child_process_fork')
    async getChildProcessFork() {
        return this.childProcessService.getChildProcessFork();
    }

    @Get('cluster')
    async startClustersFork() {
        return this.clusterService.startClustersFork();
    }
}