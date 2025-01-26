"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildProcessClusterController = void 0;
const common_1 = require("@nestjs/common");
const childProcess_service_1 = require("./childProcess.service");
const cluster_service_1 = require("./cluster.service");
let ChildProcessClusterController = class ChildProcessClusterController {
    childProcessService;
    clusterService;
    constructor(childProcessService, clusterService) {
        this.childProcessService = childProcessService;
        this.clusterService = clusterService;
    }
    // Не работает!
    getExecDocker() {
        return this.childProcessService.enterInDockerContainer();
    }
    getBusyPorts(response) {
        return this.childProcessService.getBusySystemPorts(response);
    }
    getChildProcessExec() {
        return this.childProcessService.getChildProcessExec();
    }
    getChildProcessSpawn() {
        return this.childProcessService.getChildProcessSpawn();
    }
    async getChildProcessFork() {
        return this.childProcessService.getChildProcessFork();
    }
    async startClustersFork() {
        return this.clusterService.startClustersFork();
    }
    async getClusterPorts(response) {
        return this.clusterService.getClustersPortData(response);
    }
    async exitClustersFork(response) {
        return this.clusterService.exitClusterForks(response);
    }
};
__decorate([
    (0, common_1.Get)("exec_docker"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChildProcessClusterController.prototype, "getExecDocker", null);
__decorate([
    (0, common_1.Get)("exec_busy_ports"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChildProcessClusterController.prototype, "getBusyPorts", null);
__decorate([
    (0, common_1.Get)("child_process_exec"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChildProcessClusterController.prototype, "getChildProcessExec", null);
__decorate([
    (0, common_1.Get)("child_process_spawn"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChildProcessClusterController.prototype, "getChildProcessSpawn", null);
__decorate([
    (0, common_1.Get)("child_process_fork"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChildProcessClusterController.prototype, "getChildProcessFork", null);
__decorate([
    (0, common_1.Get)("cluster_enable"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChildProcessClusterController.prototype, "startClustersFork", null);
__decorate([
    (0, common_1.Get)("cluster_ports"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChildProcessClusterController.prototype, "getClusterPorts", null);
__decorate([
    (0, common_1.Get)("cluster_exit"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChildProcessClusterController.prototype, "exitClustersFork", null);
ChildProcessClusterController = __decorate([
    (0, common_1.Controller)("childProcess_cluster"),
    __metadata("design:paramtypes", [childProcess_service_1.ChildProcessService, cluster_service_1.ClusterService])
], ChildProcessClusterController);
exports.ChildProcessClusterController = ChildProcessClusterController;
//# sourceMappingURL=childProcess_cluster.controller.js.map