"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildProcessClusterModule = void 0;
const common_1 = require("@nestjs/common");
const childProcess_service_1 = require("./childProcess.service");
const childProcess_cluster_controller_1 = require("./childProcess_cluster.controller");
const cluster_service_1 = require("./cluster.service");
let ChildProcessClusterModule = class ChildProcessClusterModule {
};
ChildProcessClusterModule = __decorate([
    (0, common_1.Module)({
        exports: [cluster_service_1.ClusterService],
        imports: [],
        controllers: [childProcess_cluster_controller_1.ChildProcessClusterController],
        providers: [childProcess_service_1.ChildProcessService, cluster_service_1.ClusterService],
    })
], ChildProcessClusterModule);
exports.ChildProcessClusterModule = ChildProcessClusterModule;
//# sourceMappingURL=childProcess_cluster.modulee.js.map