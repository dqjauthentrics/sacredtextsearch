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
exports.Translation = void 0;
const typeorm_1 = require("typeorm");
const verse_1 = require("./verse");
const tome_1 = require("./tome");
let Translation = class Translation {
};
exports.Translation = Translation;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Translation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Translation.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 25, nullable: false }),
    __metadata("design:type", String)
], Translation.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 25, nullable: true }),
    __metadata("design:type", String)
], Translation.prototype, "abbreviation", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'info_url', type: 'varchar', length: 2048, nullable: true }),
    __metadata("design:type", String)
], Translation.prototype, "infoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Translation.prototype, "publisher", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], Translation.prototype, "copyright", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'copyright_info',
        type: 'varchar',
        length: 1024,
        nullable: true,
    }),
    __metadata("design:type", String)
], Translation.prototype, "copyrightInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'screenshot_url',
        type: 'varchar',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], Translation.prototype, "screenshotUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'data_source',
        type: 'varchar',
        length: 1024,
        nullable: true,
    }),
    __metadata("design:type", String)
], Translation.prototype, "dataSource", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_default', type: 'tinyint', nullable: false }),
    __metadata("design:type", Number)
], Translation.prototype, "isDefault", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', name: 'tome_id', nullable: false }),
    __metadata("design:type", Number)
], Translation.prototype, "tomeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tome_1.Tome, (tome) => tome.translations),
    (0, typeorm_1.JoinColumn)({ name: 'tome_id' }),
    __metadata("design:type", tome_1.Tome)
], Translation.prototype, "tome", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => verse_1.Verse, (verse) => verse.translation),
    __metadata("design:type", Array)
], Translation.prototype, "verses", void 0);
exports.Translation = Translation = __decorate([
    (0, typeorm_1.Entity)('translation')
], Translation);
//# sourceMappingURL=translation.js.map