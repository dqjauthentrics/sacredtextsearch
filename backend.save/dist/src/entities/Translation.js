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
exports.Translation = void 0;
var typeorm_1 = require("typeorm");
var DataRecord_1 = require("./DataRecord");
var Verse_1 = require("./Verse");
var Tome_1 = require("./Tome");
var Translation = /** @class */ (function (_super) {
    __extends(Translation, _super);
    function Translation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], Translation.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 100, nullable: false }),
        __metadata("design:type", String)
    ], Translation.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 25, nullable: false }),
        __metadata("design:type", String)
    ], Translation.prototype, "language", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 25, nullable: true }),
        __metadata("design:type", String)
    ], Translation.prototype, "abbreviation", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 2048, nullable: true }),
        __metadata("design:type", String)
    ], Translation.prototype, "info_url", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 100, nullable: true }),
        __metadata("design:type", String)
    ], Translation.prototype, "publisher", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 100, nullable: true }),
        __metadata("design:type", String)
    ], Translation.prototype, "copyright", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 1024, nullable: true }),
        __metadata("design:type", String)
    ], Translation.prototype, "copyright_info", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 100, nullable: true }),
        __metadata("design:type", String)
    ], Translation.prototype, "screenshot_url", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 1024, nullable: true }),
        __metadata("design:type", String)
    ], Translation.prototype, "data_source", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinyint', nullable: false }),
        __metadata("design:type", Number)
    ], Translation.prototype, "is_default", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Tome_1.Tome; }, function (tome) { return tome.translations; }),
        typeorm_1.JoinColumn({ name: 'tome_id' }),
        __metadata("design:type", Tome_1.Tome)
    ], Translation.prototype, "tome", void 0);
    __decorate([
        typeorm_1.Column({ type: 'smallint', name: 'tome_id', nullable: false }),
        __metadata("design:type", Number)
    ], Translation.prototype, "tome_id", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Verse_1.Verse; }, function (verse) { return verse.translation; }),
        __metadata("design:type", Array)
    ], Translation.prototype, "verses", void 0);
    Translation = __decorate([
        typeorm_1.Entity()
    ], Translation);
    return Translation;
}(DataRecord_1.DataRecord));
exports.Translation = Translation;
