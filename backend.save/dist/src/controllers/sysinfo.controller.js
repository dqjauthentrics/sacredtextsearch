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
var routing_controllers_1 = require("routing-controllers");
var typeorm_1 = require("typeorm");
var DataResult_1 = require("../entities/DataResult");
var Sysinfo_1 = require("../entities/Sysinfo");
var SysinfoController = /** @class */ (function () {
    function SysinfoController() {
        this.repo = typeorm_1.getConnection().getRepository(Sysinfo_1.Sysinfo);
    }
    SysinfoController.prototype.get = function () {
        return this
            .repo.findOne({})
            .then(function (rec) {
            // console.log(rec);
            return new DataResult_1.DataResult(1, 0, 1, rec);
        })
            .catch(function (e) {
            process.stderr.write(e + "\n");
        });
    };
    __decorate([
        routing_controllers_1.Get('/get'),
        routing_controllers_1.OnUndefined(404),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SysinfoController.prototype, "get", null);
    SysinfoController = __decorate([
        routing_controllers_1.JsonController('/sysinfo'),
        __metadata("design:paramtypes", [])
    ], SysinfoController);
    return SysinfoController;
}());
exports.SysinfoController = SysinfoController;
