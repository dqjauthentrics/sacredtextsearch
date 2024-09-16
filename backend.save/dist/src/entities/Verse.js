"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var typeorm_1 = require("typeorm");
var Book_1 = require("./Book");
var DataRecord_1 = require("./DataRecord");
var Translation_1 = require("./Translation");
var VerseCharacterization_1 = require("./VerseCharacterization");
var Verse = /** @class */ (function (_super) {
    __extends(Verse, _super);
    function Verse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], Verse.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'int' }),
        __metadata("design:type", Number)
    ], Verse.prototype, "verse_number", void 0);
    __decorate([
        typeorm_1.Column({ type: 'int' }),
        __metadata("design:type", Number)
    ], Verse.prototype, "chapter_number", void 0);
    __decorate([
        typeorm_1.Column({ type: 'text' }),
        __metadata("design:type", String)
    ], Verse.prototype, "body", void 0);
    __decorate([
        typeorm_1.Column({ type: 'int', nullable: false }),
        __metadata("design:type", Number)
    ], Verse.prototype, "compound_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Book_1.Book; }, function (book) { return book.verses; }),
        typeorm_1.JoinColumn({ name: 'book_id' }),
        __metadata("design:type", Book_1.Book)
    ], Verse.prototype, "book", void 0);
    __decorate([
        typeorm_1.Column({ name: 'book_id', nullable: false }),
        __metadata("design:type", Number)
    ], Verse.prototype, "book_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Translation_1.Translation; }, function (translation) { return translation.verses; }),
        typeorm_1.JoinColumn({ name: 'translation_id' }),
        __metadata("design:type", Translation_1.Translation)
    ], Verse.prototype, "translation", void 0);
    __decorate([
        typeorm_1.Column({ name: 'translation_id', nullable: false }),
        __metadata("design:type", Number)
    ], Verse.prototype, "translation_id", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return VerseCharacterization_1.VerseCharacterization; }, function (characterization) { return characterization.verse; }),
        __metadata("design:type", Array)
    ], Verse.prototype, "characterizations", void 0);
    Verse = __decorate([
        typeorm_1.Entity()
    ], Verse);
    return Verse;
}(DataRecord_1.DataRecord));
exports.Verse = Verse;
