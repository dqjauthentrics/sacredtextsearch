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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRpdGllcy9UcmFuc2xhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBd0Y7QUFDeEYsMkNBQXdDO0FBQ3hDLGlDQUE4QjtBQUM5QiwrQkFBNEI7QUFHNUI7SUFBaUMsK0JBQVU7SUFBM0M7O0lBMENBLENBQUM7SUF4Q0c7UUFEQyx1QkFBYSxFQUFFOzsyQ0FDSjtJQUdaO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7OzZDQUMxQztJQUdkO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7O2lEQUNyQztJQUdsQjtRQURDLGdCQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDOztxREFDaEM7SUFHdEI7UUFEQyxnQkFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQzs7aURBQ3RDO0lBR2xCO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7O2tEQUNwQztJQUduQjtRQURDLGdCQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDOztrREFDcEM7SUFHbkI7UUFEQyxnQkFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQzs7dURBQ2hDO0lBR3hCO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7O3VEQUMvQjtJQUd4QjtRQURDLGdCQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDOztvREFDbkM7SUFHckI7UUFEQyxnQkFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7O21EQUN2QjtJQUlwQjtRQUZDLG1CQUFTLENBQUMsY0FBTSxPQUFBLFdBQUksRUFBSixDQUFJLEVBQUUsVUFBQyxJQUFVLElBQUssT0FBQSxJQUFJLENBQUMsWUFBWSxFQUFqQixDQUFpQixDQUFDO1FBQ3hELG9CQUFVLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7a0NBQ3ZCLFdBQUk7NkNBQUM7SUFFWjtRQURDLGdCQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDOztnREFDNUM7SUFHakI7UUFEQyxtQkFBUyxDQUFDLGNBQU0sT0FBQSxhQUFLLEVBQUwsQ0FBSyxFQUFFLFVBQUMsS0FBWSxJQUFLLE9BQUEsS0FBSyxDQUFDLFdBQVcsRUFBakIsQ0FBaUIsQ0FBQzs7K0NBQzNDO0lBekNSLFdBQVc7UUFEdkIsZ0JBQU0sRUFBRTtPQUNJLFdBQVcsQ0EwQ3ZCO0lBQUQsa0JBQUM7Q0ExQ0QsQUEwQ0MsQ0ExQ2dDLHVCQUFVLEdBMEMxQztBQTFDWSxrQ0FBVyIsImZpbGUiOiJlbnRpdGllcy9UcmFuc2xhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29sdW1uLCBFbnRpdHksIEpvaW5Db2x1bW4sIE1hbnlUb09uZSwgT25lVG9NYW55LCBQcmltYXJ5Q29sdW1ufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7RGF0YVJlY29yZH0gZnJvbSAnLi9EYXRhUmVjb3JkJztcbmltcG9ydCB7VmVyc2V9IGZyb20gJy4vVmVyc2UnO1xuaW1wb3J0IHtUb21lfSBmcm9tICcuL1RvbWUnO1xuXG5ARW50aXR5KClcbmV4cG9ydCBjbGFzcyBUcmFuc2xhdGlvbiBleHRlbmRzIERhdGFSZWNvcmQge1xuICAgIEBQcmltYXJ5Q29sdW1uKClcbiAgICBpZCE6IG51bWJlcjtcblxuICAgIEBDb2x1bW4oe3R5cGU6ICd2YXJjaGFyJywgbGVuZ3RoOiAxMDAsIG51bGxhYmxlOiBmYWxzZX0pXG4gICAgbmFtZSE6IHN0cmluZztcblxuICAgIEBDb2x1bW4oe3R5cGU6ICd2YXJjaGFyJywgbGVuZ3RoOiAyNSwgbnVsbGFibGU6IGZhbHNlfSlcbiAgICBsYW5ndWFnZSE6IHN0cmluZztcblxuICAgIEBDb2x1bW4oe3R5cGU6ICd2YXJjaGFyJywgbGVuZ3RoOiAyNSwgbnVsbGFibGU6IHRydWV9KVxuICAgIGFiYnJldmlhdGlvbiE6IHN0cmluZztcblxuICAgIEBDb2x1bW4oe3R5cGU6ICd2YXJjaGFyJywgbGVuZ3RoOiAyMDQ4LCBudWxsYWJsZTogdHJ1ZX0pXG4gICAgaW5mb191cmwhOiBzdHJpbmc7XG5cbiAgICBAQ29sdW1uKHt0eXBlOiAndmFyY2hhcicsIGxlbmd0aDogMTAwLCBudWxsYWJsZTogdHJ1ZX0pXG4gICAgcHVibGlzaGVyITogc3RyaW5nO1xuXG4gICAgQENvbHVtbih7dHlwZTogJ3ZhcmNoYXInLCBsZW5ndGg6IDEwMCwgbnVsbGFibGU6IHRydWV9KVxuICAgIGNvcHlyaWdodCE6IHN0cmluZztcblxuICAgIEBDb2x1bW4oe3R5cGU6ICd2YXJjaGFyJywgbGVuZ3RoOiAxMDI0LCBudWxsYWJsZTogdHJ1ZX0pXG4gICAgY29weXJpZ2h0X2luZm8hOiBzdHJpbmc7XG5cbiAgICBAQ29sdW1uKHt0eXBlOiAndmFyY2hhcicsIGxlbmd0aDogMTAwLCBudWxsYWJsZTogdHJ1ZX0pXG4gICAgc2NyZWVuc2hvdF91cmwhOiBzdHJpbmc7XG5cbiAgICBAQ29sdW1uKHt0eXBlOiAndmFyY2hhcicsIGxlbmd0aDogMTAyNCwgbnVsbGFibGU6IHRydWV9KVxuICAgIGRhdGFfc291cmNlITogc3RyaW5nO1xuXG4gICAgQENvbHVtbih7dHlwZTogJ3RpbnlpbnQnLCBudWxsYWJsZTogZmFsc2V9KVxuICAgIGlzX2RlZmF1bHQhOiBudW1iZXI7XG5cbiAgICBATWFueVRvT25lKCgpID0+IFRvbWUsICh0b21lOiBUb21lKSA9PiB0b21lLnRyYW5zbGF0aW9ucylcbiAgICBASm9pbkNvbHVtbih7bmFtZTogJ3RvbWVfaWQnfSlcbiAgICB0b21lITogVG9tZTtcbiAgICBAQ29sdW1uKHt0eXBlOiAnc21hbGxpbnQnLCBuYW1lOiAndG9tZV9pZCcsIG51bGxhYmxlOiBmYWxzZX0pXG4gICAgdG9tZV9pZCE6IG51bWJlcjtcblxuICAgIEBPbmVUb01hbnkoKCkgPT4gVmVyc2UsICh2ZXJzZTogVmVyc2UpID0+IHZlcnNlLnRyYW5zbGF0aW9uKVxuICAgIHZlcnNlcyE6IFZlcnNlW107XG59XG4iXX0=
