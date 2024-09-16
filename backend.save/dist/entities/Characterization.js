"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
var typeorm_1 = require("typeorm");
var DataRecord_1 = require("./DataRecord");
var Verse_1 = require("./Verse");
var Characterization = /** @class */ (function (_super) {
    __extends(Characterization, _super);
    function Characterization() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryColumn({ type: 'char' }),
        __metadata("design:type", String)
    ], Characterization.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 40, nullable: false, unique: true }),
        __metadata("design:type", String)
    ], Characterization.prototype, "name", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Verse_1.Verse; }, function (verse) { return verse.book; }),
        __metadata("design:type", Array)
    ], Characterization.prototype, "verses", void 0);
    Characterization = __decorate([
        typeorm_1.Entity()
    ], Characterization);
    return Characterization;
}(DataRecord_1.DataRecord));
exports.Characterization = Characterization;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRpdGllcy9DaGFyYWN0ZXJpemF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFpRTtBQUNqRSwyQ0FBd0M7QUFDeEMsaUNBQThCO0FBRzlCO0lBQXNDLG9DQUFVO0lBQWhEOztJQVNBLENBQUM7SUFQRztRQURDLHVCQUFhLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7O2dEQUNsQjtJQUdaO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzs7a0RBQ3ZEO0lBR2Q7UUFEQyxtQkFBUyxDQUFDLGNBQU0sT0FBQSxhQUFLLEVBQUwsQ0FBSyxFQUFFLFVBQUMsS0FBWSxJQUFLLE9BQUEsS0FBSyxDQUFDLElBQUksRUFBVixDQUFVLENBQUM7O29EQUNwQztJQVJSLGdCQUFnQjtRQUQ1QixnQkFBTSxFQUFFO09BQ0ksZ0JBQWdCLENBUzVCO0lBQUQsdUJBQUM7Q0FURCxBQVNDLENBVHFDLHVCQUFVLEdBUy9DO0FBVFksNENBQWdCIiwiZmlsZSI6ImVudGl0aWVzL0NoYXJhY3Rlcml6YXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbHVtbiwgRW50aXR5LCBPbmVUb01hbnksIFByaW1hcnlDb2x1bW59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtEYXRhUmVjb3JkfSBmcm9tICcuL0RhdGFSZWNvcmQnO1xuaW1wb3J0IHtWZXJzZX0gZnJvbSAnLi9WZXJzZSc7XG5cbkBFbnRpdHkoKVxuZXhwb3J0IGNsYXNzIENoYXJhY3Rlcml6YXRpb24gZXh0ZW5kcyBEYXRhUmVjb3JkIHtcbiAgICBAUHJpbWFyeUNvbHVtbih7dHlwZTogJ2NoYXInfSlcbiAgICBpZCE6IHN0cmluZztcblxuICAgIEBDb2x1bW4oe3R5cGU6ICd2YXJjaGFyJywgbGVuZ3RoOiA0MCwgbnVsbGFibGU6IGZhbHNlLCB1bmlxdWU6IHRydWV9KVxuICAgIG5hbWUhOiBzdHJpbmc7XG5cbiAgICBAT25lVG9NYW55KCgpID0+IFZlcnNlLCAodmVyc2U6IFZlcnNlKSA9PiB2ZXJzZS5ib29rKVxuICAgIHZlcnNlcyE6IFZlcnNlW107XG59XG4iXX0=
