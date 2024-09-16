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
exports.Verse = void 0;
const typeorm_1 = require("typeorm");
const book_1 = require("./book");
const translation_1 = require("./translation");
const verse_characterization_1 = require("./verse-characterization");
let Verse = class Verse {
};
exports.Verse = Verse;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], Verse.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'verse_number', type: 'int' }),
    __metadata("design:type", Number)
], Verse.prototype, "verseNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'chapter_number', type: 'int' }),
    __metadata("design:type", Number)
], Verse.prototype, "chapterNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Verse.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'compound_id', type: 'int', nullable: false }),
    __metadata("design:type", Number)
], Verse.prototype, "compoundId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'book_id', nullable: false }),
    __metadata("design:type", Number)
], Verse.prototype, "bookId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'translation_id', nullable: false }),
    __metadata("design:type", Number)
], Verse.prototype, "translationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => book_1.Book, (book) => book.verses),
    (0, typeorm_1.JoinColumn)({ name: 'book_id' }),
    __metadata("design:type", book_1.Book)
], Verse.prototype, "book", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => translation_1.Translation, (translation) => translation.verses),
    (0, typeorm_1.JoinColumn)({ name: 'translation_id' }),
    __metadata("design:type", translation_1.Translation)
], Verse.prototype, "translation", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => verse_characterization_1.VerseCharacterization, (characterization) => characterization.verse),
    __metadata("design:type", Array)
], Verse.prototype, "characterizations", void 0);
exports.Verse = Verse = __decorate([
    (0, typeorm_1.Entity)('verse')
], Verse);
//# sourceMappingURL=verse.js.map