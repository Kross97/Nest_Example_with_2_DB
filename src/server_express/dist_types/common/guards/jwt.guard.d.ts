import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
export declare class AuthGuard implements CanActivate {
    private accessUrls;
    private validateAuthToken;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
//# sourceMappingURL=jwt.guard.d.ts.map