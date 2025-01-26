import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
export declare class RolesGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    private matchRole;
    canActivate(context: ExecutionContext): boolean;
}
//# sourceMappingURL=roles.guard.d.ts.map