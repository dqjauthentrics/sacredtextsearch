"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const server_config_service_1 = require("./config/server-config.service");
const collection_controller_1 = require("./controllers/collection.controller");
const analyze_controller_1 = require("./controllers/analyze.controller");
const email_controller_1 = require("./controllers/email.controller");
const search_controller_1 = require("./controllers/search.controller");
const sysinfo_controller_1 = require("./controllers/sysinfo.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forRoot(new server_config_service_1.ServerConfigService().getTypeOrmConfig())],
        controllers: [app_controller_1.AppController, analyze_controller_1.AnalyzeController, collection_controller_1.CollectionController, email_controller_1.EmailController, search_controller_1.SearchController, sysinfo_controller_1.SysinfoController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map