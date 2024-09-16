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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRpdGllcy9Ub21lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUF3RjtBQUN4RiwyQ0FBd0M7QUFDeEMsNkNBQTBDO0FBQzFDLCtCQUE0QjtBQUM1Qix1Q0FBb0M7QUFHcEM7SUFBMEIsd0JBQVU7SUFBcEM7O0lBaUNBLENBQUM7SUEvQkc7UUFEQyx1QkFBYSxDQUFDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUFDOztvQ0FDdEI7SUFHWjtRQURDLGdCQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDOztzQ0FDekM7SUFHZDtRQURDLGdCQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQzs7a0RBQ2hCO0lBRzFCO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQzs7NENBQ047SUFHcEI7UUFEQyxnQkFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQzs7OENBQ2hDO0lBR3RCO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7O3NDQUMxQztJQUdkO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7O3VDQUN4QztJQUdmO1FBREMsbUJBQVMsQ0FBQyxjQUFNLE9BQUEseUJBQVcsRUFBWCxDQUFXLEVBQUUsVUFBQyxXQUF3QixJQUFLLE9BQUEsV0FBVyxDQUFDLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQzs7OENBQ2hEO0lBRzdCO1FBREMsbUJBQVMsQ0FBQyxjQUFNLE9BQUEsV0FBSSxFQUFKLENBQUksRUFBRSxVQUFDLElBQVUsSUFBSyxPQUFBLElBQUksQ0FBQyxJQUFJLEVBQVQsQ0FBUyxDQUFDOzt1Q0FDbEM7SUFJZjtRQUZDLG1CQUFTLENBQUMsY0FBTSxPQUFBLG1CQUFRLEVBQVIsQ0FBUSxFQUFFLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLEtBQUssRUFBZCxDQUFjLENBQUM7UUFDckQsb0JBQVUsQ0FBQyxFQUFDLElBQUksRUFBRSxhQUFhLEVBQUMsQ0FBQztrQ0FDdkIsbUJBQVE7MENBQUM7SUFFcEI7UUFEQyxnQkFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7OzZDQUN2QjtJQWhDWixJQUFJO1FBRGhCLGdCQUFNLEVBQUU7T0FDSSxJQUFJLENBaUNoQjtJQUFELFdBQUM7Q0FqQ0QsQUFpQ0MsQ0FqQ3lCLHVCQUFVLEdBaUNuQztBQWpDWSxvQkFBSSIsImZpbGUiOiJlbnRpdGllcy9Ub21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb2x1bW4sIEVudGl0eSwgSm9pbkNvbHVtbiwgTWFueVRvT25lLCBPbmVUb01hbnksIFByaW1hcnlDb2x1bW59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtEYXRhUmVjb3JkfSBmcm9tICcuL0RhdGFSZWNvcmQnO1xuaW1wb3J0IHtUcmFuc2xhdGlvbn0gZnJvbSAnLi9UcmFuc2xhdGlvbic7XG5pbXBvcnQge0Jvb2t9IGZyb20gJy4vQm9vayc7XG5pbXBvcnQge1JlbGlnaW9ufSBmcm9tICcuL1JlbGlnaW9uJztcblxuQEVudGl0eSgpXG5leHBvcnQgY2xhc3MgVG9tZSBleHRlbmRzIERhdGFSZWNvcmQge1xuICAgIEBQcmltYXJ5Q29sdW1uKHt0eXBlOiAnc21hbGxpbnQnfSlcbiAgICBpZCE6IG51bWJlcjtcblxuICAgIEBDb2x1bW4oe3R5cGU6ICd2YXJjaGFyJywgbGVuZ3RoOiA1MCwgbnVsbGFibGU6IGZhbHNlfSlcbiAgICBuYW1lITogc3RyaW5nO1xuXG4gICAgQENvbHVtbih7dHlwZTogJ3RpbnlpbnQnLCBudWxsYWJsZTogdHJ1ZX0pXG4gICAgaGFzX3RyYW5zbGF0aW9ucyE6IG51bWJlcjtcblxuICAgIEBDb2x1bW4oe3R5cGU6ICd0aW55aW50J30pXG4gICAgc29ydF9vcmRlciE6IHN0cmluZztcblxuICAgIEBDb2x1bW4oe3R5cGU6ICd2YXJjaGFyJywgbGVuZ3RoOiAxMCwgbnVsbGFibGU6IHRydWV9KVxuICAgIGFiYnJldmlhdGlvbiE6IHN0cmluZztcblxuICAgIEBDb2x1bW4oe3R5cGU6ICd2YXJjaGFyJywgbGVuZ3RoOiAxMDAsIG51bGxhYmxlOiBmYWxzZX0pXG4gICAgaWNvbiE6IHN0cmluZztcblxuICAgIEBDb2x1bW4oe3R5cGU6ICd2YXJjaGFyJywgbGVuZ3RoOiAyMCwgbnVsbGFibGU6IGZhbHNlfSlcbiAgICBjb2xvciE6IHN0cmluZztcblxuICAgIEBPbmVUb01hbnkoKCkgPT4gVHJhbnNsYXRpb24sICh0cmFuc2xhdGlvbjogVHJhbnNsYXRpb24pID0+IHRyYW5zbGF0aW9uLnRvbWUpXG4gICAgdHJhbnNsYXRpb25zITogVHJhbnNsYXRpb25bXTtcblxuICAgIEBPbmVUb01hbnkoKCkgPT4gQm9vaywgKGJvb2s6IEJvb2spID0+IGJvb2sudG9tZSlcbiAgICBib29rcyE6IEJvb2tbXTtcblxuICAgIEBNYW55VG9PbmUoKCkgPT4gUmVsaWdpb24sIHJlbGlnaW9uID0+IHJlbGlnaW9uLnRvbWVzKVxuICAgIEBKb2luQ29sdW1uKHtuYW1lOiAncmVsaWdpb25faWQnfSlcbiAgICByZWxpZ2lvbiE6IFJlbGlnaW9uO1xuICAgIEBDb2x1bW4oe3R5cGU6ICdzbWFsbGludCcsIG51bGxhYmxlOiBmYWxzZX0pXG4gICAgcmVsaWdpb25faWQhOiBudW1iZXI7XG59XG4iXX0=
