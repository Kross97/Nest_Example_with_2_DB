import { Response } from "express";
export declare class ChildProcessService {
    constructor();
    enterInDockerContainer(): Promise<void>;
    getBusySystemPorts(response: Response): Promise<void>;
    getChildProcessExec(): Promise<[unknown, unknown, unknown]>;
    getChildProcessSpawn(): Promise<[unknown, unknown]>;
    getChildProcessFork(): Promise<void>;
}
//# sourceMappingURL=childProcess.service.d.ts.map