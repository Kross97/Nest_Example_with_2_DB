import { Repository } from "typeorm";
import { Response } from "express";
import { IAuthRequest } from "./types";
import { User } from "../../entities/user/user.entity";
import { ClusterService } from "../childProcess_cluster/cluster.service";
export declare class AuthorizationService {
    private userRepository;
    private clusterService;
    /**
     * Обьявлять переменные нужно здесь а не в конструкторе (при использовании декораторов на подобии @InjectRepository)
     * т.к будет ошибка решения зависимостей "Nest can't resolve dependencies...."
     * */
    private headJwt;
    private minuteExp;
    constructor(userRepository: Repository<User>, clusterService: ClusterService);
    private buildJwtToken;
    signIn(body: IAuthRequest, response: Response): Promise<void>;
}
//# sourceMappingURL=authorization.service.d.ts.map