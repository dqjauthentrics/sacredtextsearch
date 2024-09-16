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
exports.Religion = void 0;
var typeorm_1 = require("typeorm");
var DataRecord_1 = require("./DataRecord");
var Tome_1 = require("./Tome");
var Religion = /** @class */ (function (_super) {
    __extends(Religion, _super);
    function Religion() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Religion_1 = Religion;
    var Religion_1;
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], Religion.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 50, nullable: false }),
        __metadata("design:type", String)
    ], Religion.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 50, nullable: true }),
        __metadata("design:type", String)
    ], Religion.prototype, "adherents", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 4096 }),
        __metadata("design:type", String)
    ], Religion.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({ type: 'smallint', nullable: true }),
        __metadata("design:type", Number)
    ], Religion.prototype, "parent_id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinyint', nullable: true }),
        __metadata("design:type", Number)
    ], Religion.prototype, "sort_order", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Tome_1.Tome; }, function (tome) { return tome.religion; }),
        __metadata("design:type", Array)
    ], Religion.prototype, "tomes", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Religion_1; }, function (religion) { return religion.children; }),
        typeorm_1.JoinColumn({ name: 'parent_id' }),
        __metadata("design:type", Religion)
    ], Religion.prototype, "parent", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Religion_1; }, function (religion) { return religion.parent; }),
        typeorm_1.JoinColumn({ name: 'parent_id' }),
        __metadata("design:type", Array)
    ], Religion.prototype, "children", void 0);
    Religion = Religion_1 = __decorate([
        typeorm_1.Entity()
    ], Religion);
    return Religion;
}(DataRecord_1.DataRecord));
exports.Religion = Religion;
