import {

    Controller, Get,
} from '@nestjs/common';
import {ChildProcessService} from "./childProcess.service";
@Controller('childProcess_cluster')
export class ChildProcessClusterController {
    constructor(private childProcessService: ChildProcessService) {
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
}