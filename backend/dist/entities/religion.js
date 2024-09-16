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
exports.Religion = void 0;
const typeorm_1 = require("typeorm");
const tome_1 = require("./tome");
let Religion = class Religion {
};
exports.Religion = Religion;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Religion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], Religion.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], Religion.prototype, "adherents", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 4096 }),
    __metadata("design:type", String)
], Religion.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parent_id', type: 'smallint', nullable: true }),
    __metadata("design:type", Number)
], Religion.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order', type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], Religion.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tome_1.Tome, (tome) => tome.religion),
    __metadata("design:type", Array)
], Religion.prototype, "tomes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Religion, (religion) => religion.children),
    (0, typeorm_1.JoinColumn)({ name: 'parent_id' }),
    __metadata("design:type", Religion)
], Religion.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Religion, (religion) => religion.parent),
    (0, typeorm_1.JoinColumn)({ name: 'parent_id' }),
    __metadata("design:type", Array)
], Religion.prototype, "children", void 0);
exports.Religion = Religion = __decorate([
    (0, typeorm_1.Entity)('religion')
], Religion);
//# sourceMappingURL=religion.js.map