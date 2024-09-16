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
exports.VerseCharacterization = void 0;
const typeorm_1 = require("typeorm");
const verse_1 = require("./verse");
let VerseCharacterization = class VerseCharacterization {
};
exports.VerseCharacterization = VerseCharacterization;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], VerseCharacterization.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'characterization_id',
        type: 'char',
        length: 1,
        nullable: false,
    }),
    __metadata("design:type", String)
], VerseCharacterization.prototype, "characterizationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'verse_id', nullable: false }),
    __metadata("design:type", Number)
], VerseCharacterization.prototype, "verseId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: false }),
    __metadata("design:type", Number)
], VerseCharacterization.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: false }),
    __metadata("design:type", Number)
], VerseCharacterization.prototype, "percent", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => verse_1.Verse, (verse) => verse.characterizations),
    (0, typeorm_1.JoinColumn)({ name: 'verse_id' }),
    __metadata("design:type", VerseCharacterization)
], VerseCharacterization.prototype, "verse", void 0);
exports.VerseCharacterization = VerseCharacterization = __decorate([
    (0, typeorm_1.Entity)('verse-characterization')
], VerseCharacterization);
//# sourceMappingURL=verse-characterization.js.map