import { Response } from "express";
import { ChildProcessService } from "./childProcess.service";
import { ClusterService } from "./cluster.service";
export declare class ChildProcessClusterController {
    private childProcessService;
    private clusterService;
    constructor(childProcessService: ChildProcessService, clusterService: ClusterService);
    getExecDocker(): Promise<void>;
    getBusyPorts(response: any): Promise<void>;
    getChildProcessExec(): Promise<[unknown, unknown, unknown]>;
    getChildProcessSpawn(): Promise<[unknown, unknown]>;
    getChildProcessFork(): Promise<void>;
    startClustersFork(): Promise<never[] | undefined>;
    getClusterPorts(response: Response): Promise<void>;
    exitClustersFork(response: Response): Promise<void>;
}
//# sourceMappingURL=childProcess_cluster.controller.d.ts.map