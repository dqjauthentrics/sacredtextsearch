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
exports.CollectionController = void 0;
const tome_1 = require("../entities/tome");
const religion_1 = require("../entities/religion");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const process = require("process");
const data_result_1 = require("../shared/interfaces/data-result");
let CollectionController = class CollectionController {
    constructor() {
        this.dataSource = global.ServerConfig.dataSource;
    }
    list() {
        const tomeRepo = this.dataSource.getRepository(tome_1.Tome);
        return tomeRepo.count().then((totalCount) => {
            const options = {
                order: { sortOrder: 'ASC' },
                relations: ['translations', 'children'],
            };
            return tomeRepo
                .find(options)
                .then((tomes) => {
                return new data_result_1.DataResult(totalCount, 0, totalCount, tomes);
            })
                .catch((e) => {
                process.stderr.write(`${e}\n`);
            });
        });
    }
    tree() {
        return this.getReligions(null).then((religions) => {
            const totalCount = religions.length;
            return new data_result_1.DataResult(totalCount, 0, totalCount, religions);
        });
    }
    async getReligions(parentId) {
        const religionRepo = this.dataSource.getRepository(religion_1.Religion);
        let religions = [];
        let condition = { parentId: (0, typeorm_1.IsNull)() };
        if (parentId) {
            condition = { parentId };
        }
        await religionRepo
            .find({
            order: { sortOrder: 'ASC' },
            where: condition,
            relations: ['tomes', 'tomes.translations'],
        })
            .then((rels) => {
            religions = rels;
        });
        for (let i = 0; i < religions.length; i++) {
            religions[i].children = await this.getReligions(religions[i].id);
        }
        return religions;
    }
};
exports.CollectionController = CollectionController;
__decorate([
    (0, common_1.Get)('/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('/tree'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CollectionController.prototype, "tree", null);
exports.CollectionController = CollectionController = __decorate([
    (0, common_1.Controller)('/collection'),
    __metadata("design:paramtypes", [])
], CollectionController);
//# sourceMappingURL=collection.controller.js.map