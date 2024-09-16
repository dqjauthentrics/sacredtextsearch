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
exports.Chapter = void 0;
const typeorm_1 = require("typeorm");
let Chapter = class Chapter {
};
exports.Chapter = Chapter;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Chapter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'book_id', type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], Chapter.prototype, "bookId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'translation_id', type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Chapter.prototype, "translationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'chapter_number', type: 'tinyint', nullable: true }),
    __metadata("design:type", Number)
], Chapter.prototype, "chapterNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: false }),
    __metadata("design:type", String)
], Chapter.prototype, "name", void 0);
exports.Chapter = Chapter = __decorate([
    (0, typeorm_1.Entity)('chapter')
], Chapter);
//# sourceMappingURL=chapter.js.map