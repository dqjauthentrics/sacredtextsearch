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
var Chapter = /** @class */ (function (_super) {
    __extends(Chapter, _super);
    function Chapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], Chapter.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinyint', nullable: true }),
        __metadata("design:type", Number)
    ], Chapter.prototype, "book_id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'int', nullable: true }),
        __metadata("design:type", Number)
    ], Chapter.prototype, "translation_id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinyint', nullable: true }),
        __metadata("design:type", Number)
    ], Chapter.prototype, "chapter_number", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 500, nullable: false }),
        __metadata("design:type", String)
    ], Chapter.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 1000 }),
        __metadata("design:type", String)
    ], Chapter.prototype, "title", void 0);
    Chapter = __decorate([
        typeorm_1.Entity()
    ], Chapter);
    return Chapter;
}(DataRecord_1.DataRecord));
exports.Chapter = Chapter;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRpdGllcy9DaGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUF3RjtBQUN4RiwyQ0FBd0M7QUFLeEM7SUFBNkIsMkJBQVU7SUFBdkM7O0lBcUJBLENBQUM7SUFuQkc7UUFEQyx1QkFBYSxFQUFFOzt1Q0FDSjtJQUdaO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDOzs0Q0FDekI7SUFHakI7UUFEQyxnQkFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7O21EQUNkO0lBR3hCO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDOzttREFDbEI7SUFHeEI7UUFEQyxnQkFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQzs7eUNBQzFDO0lBR2Q7UUFEQyxnQkFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7OzBDQUN6QjtJQWpCTixPQUFPO1FBRG5CLGdCQUFNLEVBQUU7T0FDSSxPQUFPLENBcUJuQjtJQUFELGNBQUM7Q0FyQkQsQUFxQkMsQ0FyQjRCLHVCQUFVLEdBcUJ0QztBQXJCWSwwQkFBTyIsImZpbGUiOiJlbnRpdGllcy9DaGFwdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb2x1bW4sIEVudGl0eSwgSm9pbkNvbHVtbiwgTWFueVRvT25lLCBPbmVUb01hbnksIFByaW1hcnlDb2x1bW59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtEYXRhUmVjb3JkfSBmcm9tICcuL0RhdGFSZWNvcmQnO1xuaW1wb3J0IHtWZXJzZX0gZnJvbSAnLi9WZXJzZSc7XG5pbXBvcnQge1RvbWV9IGZyb20gJy4vVG9tZSc7XG5cbkBFbnRpdHkoKVxuZXhwb3J0IGNsYXNzIENoYXB0ZXIgZXh0ZW5kcyBEYXRhUmVjb3JkIHtcbiAgICBAUHJpbWFyeUNvbHVtbigpXG4gICAgaWQhOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKHt0eXBlOiAndGlueWludCcsIG51bGxhYmxlOiB0cnVlfSlcbiAgICBib29rX2lkITogbnVtYmVyO1xuXG4gICAgQENvbHVtbih7dHlwZTogJ2ludCcsIG51bGxhYmxlOiB0cnVlfSlcbiAgICB0cmFuc2xhdGlvbl9pZCE6IG51bWJlcjtcblxuICAgIEBDb2x1bW4oe3R5cGU6ICd0aW55aW50JywgbnVsbGFibGU6IHRydWV9KVxuICAgIGNoYXB0ZXJfbnVtYmVyITogbnVtYmVyO1xuXG4gICAgQENvbHVtbih7dHlwZTogJ3ZhcmNoYXInLCBsZW5ndGg6IDUwMCwgbnVsbGFibGU6IGZhbHNlfSlcbiAgICBuYW1lITogc3RyaW5nO1xuXG4gICAgQENvbHVtbih7dHlwZTogJ3ZhcmNoYXInLCBsZW5ndGg6IDEwMDB9KVxuICAgIHRpdGxlITogc3RyaW5nO1xuXG4gICAgLy8gTm90IHJlbGF0ZWQgYnkga2V5LlxuICAgIHZlcnNlcz86IEFycmF5PFZlcnNlPjtcbn1cbiJdfQ==
