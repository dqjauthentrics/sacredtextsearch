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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SysinfoController = void 0;
const sysinfo_1 = require("../entities/sysinfo");
const common_1 = require("@nestjs/common");
const data_result_1 = require("../shared/interfaces/data-result");
let SysinfoController = class SysinfoController {
    constructor() {
        this.dataSource = global.ServerConfig.dataSource;
        this.repo = this.dataSource.getRepository(sysinfo_1.Sysinfo);
    }
    get() {
        return this.repo
            .findOne({ where: { id: 1 } })
            .then((rec) => {
            return new data_result_1.DataResult(1, 0, 1, rec);
        })
            .catch((e) => {
            process.stderr.write(`${e}\n`);
        });
    }
};
exports.SysinfoController = SysinfoController;
__decorate([
    (0, common_1.Get)('/get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SysinfoController.prototype, "get", null);
exports.SysinfoController = SysinfoController = __decorate([
    (0, common_1.Controller)('/sysinfo'),
    __metadata("design:paramtypes", [])
], SysinfoController);
//# sourceMappingURL=sysinfo.controller.js.map