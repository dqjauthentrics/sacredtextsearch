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
exports.Tome = void 0;
var typeorm_1 = require("typeorm");
var DataRecord_1 = require("./DataRecord");
var Translation_1 = require("./Translation");
var Book_1 = require("./Book");
var Religion_1 = require("./Religion");
var Tome = /** @class */ (function (_super) {
    __extends(Tome, _super);
    function Tome() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryColumn({ type: 'smallint' }),
        __metadata("design:type", Number)
    ], Tome.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 50, nullable: false }),
        __metadata("design:type", String)
    ], Tome.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinyint', nullable: true }),
        __metadata("design:type", Number)
    ], Tome.prototype, "has_translations", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinyint' }),
        __metadata("design:type", String)
    ], Tome.prototype, "sort_order", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 10, nullable: true }),
        __metadata("design:type", String)
    ], Tome.prototype, "abbreviation", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 100, nullable: false }),
        __metadata("design:type", String)
    ], Tome.prototype, "icon", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 20, nullable: false }),
        __metadata("design:type", String)
    ], Tome.prototype, "color", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Translation_1.Translation; }, function (translation) { return translation.tome; }),
        __metadata("design:type", Array)
    ], Tome.prototype, "translations", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Book_1.Book; }, function (book) { return book.tome; }),
        __metadata("design:type", Array)
    ], Tome.prototype, "books", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Religion_1.Religion; }, function (religion) { return religion.tomes; }),
        typeorm_1.JoinColumn({ name: 'religion_id' }),
        __metadata("design:type", Religion_1.Religion)
    ], Tome.prototype, "religion", void 0);
    __decorate([
        typeorm_1.Column({ type: 'smallint', nullable: false }),
        __metadata("design:type", Number)
    ], Tome.prototype, "religion_id", void 0);
    Tome = __decorate([
        typeorm_1.Entity()
    ], Tome);
    return Tome;
}(DataRecord_1.DataRecord));
exports.Tome = Tome;
