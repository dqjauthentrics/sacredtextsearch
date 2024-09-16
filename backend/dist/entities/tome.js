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
exports.Tome = void 0;
const typeorm_1 = require("typeorm");
const translation_1 = require("./translation");
const book_1 = require("./book");
const religion_1 = require("./religion");
let Tome = class Tome {
};
exports.Tome = Tome;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'smallint' }),
    __metadata("design:type", Number)
], Tome.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: false }),
    __metadata("design:type", String)
], Tome.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'has_translations', type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], Tome.prototype, "hasTranslations", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sort_order', type: 'tinyint' }),
    __metadata("design:type", String)
], Tome.prototype, "sortOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: true }),
    __metadata("design:type", String)
], Tome.prototype, "abbreviation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
    __metadata("design:type", String)
], Tome.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: false }),
    __metadata("design:type", String)
], Tome.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'religion_id', type: 'smallint', nullable: false }),
    __metadata("design:type", Number)
], Tome.prototype, "religionId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => translation_1.Translation, (translation) => translation.tome),
    __metadata("design:type", Array)
], Tome.prototype, "translations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => book_1.Book, (book) => book.tome),
    __metadata("design:type", Array)
], Tome.prototype, "books", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => religion_1.Religion, (religion) => religion.tomes),
    (0, typeorm_1.JoinColumn)({ name: 'religion_id' }),
    __metadata("design:type", religion_1.Religion)
], Tome.prototype, "religion", void 0);
exports.Tome = Tome = __decorate([
    (0, typeorm_1.Entity)('tome')
], Tome);
//# sourceMappingURL=tome.js.map