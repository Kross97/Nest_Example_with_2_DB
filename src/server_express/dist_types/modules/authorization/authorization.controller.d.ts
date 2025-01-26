import { Response } from "express";
import { AuthorizationService } from "./authorization.service";
import { IAuthRequest } from "./types";
export declare class AuthorizationController {
    private authorizationService;
    constructor(authorizationService: AuthorizationService);
    signIn(body: IAuthRequest, response: Response): Promise<void>;
}
//# sourceMappingURL=authorization.controller.d.ts.map