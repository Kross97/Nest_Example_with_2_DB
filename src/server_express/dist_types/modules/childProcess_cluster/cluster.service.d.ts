import { Response } from "express";
export declare class ClusterService {
    static mainPort: number;
    static availablePorts: {
        id: null;
        port: number;
    }[];
    startClustersFork(): Promise<never[] | undefined>;
    exitClusterForks(response: Response): Promise<void>;
    getCurrentPort(): number;
    getClustersPortData(response: Response): void;
}
//# sourceMappingURL=cluster.service.d.ts.map