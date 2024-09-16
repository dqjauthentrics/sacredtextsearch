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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRpdGllcy9SZWxpZ2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBd0Y7QUFDeEYsMkNBQXdDO0FBRXhDLCtCQUE0QjtBQUc1QjtJQUE4Qiw0QkFBVTtJQUF4Qzs7SUE2QkEsQ0FBQztpQkE3QlksUUFBUTs7SUFFakI7UUFEQyx1QkFBYSxFQUFFOzt3Q0FDSjtJQUdaO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7OzBDQUN6QztJQUdkO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7OytDQUNuQztJQUduQjtRQURDLGdCQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzs7aURBQ25CO0lBR3JCO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDOzsrQ0FDeEI7SUFHbkI7UUFEQyxnQkFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7O2dEQUN0QjtJQUdwQjtRQURDLG1CQUFTLENBQUMsY0FBTSxPQUFBLFdBQUksRUFBSixDQUFJLEVBQUUsVUFBQyxJQUFVLElBQUssT0FBQSxJQUFJLENBQUMsUUFBUSxFQUFiLENBQWEsQ0FBQzs7MkNBQ3RDO0lBSWY7UUFGQyxtQkFBUyxDQUFDLGNBQU0sT0FBQSxVQUFRLEVBQVIsQ0FBUSxFQUFFLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLFFBQVEsRUFBakIsQ0FBaUIsQ0FBQztRQUN4RCxvQkFBVSxDQUFDLEVBQUMsSUFBSSxFQUFFLFdBQVcsRUFBQyxDQUFDO2tDQUN2QixRQUFROzRDQUFDO0lBSWxCO1FBRkMsbUJBQVMsQ0FBQyxjQUFNLE9BQUEsVUFBUSxFQUFSLENBQVEsRUFBRSxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxNQUFNLEVBQWYsQ0FBZSxDQUFDO1FBQ3RELG9CQUFVLENBQUMsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFDLENBQUM7OzhDQUNWO0lBNUJiLFFBQVE7UUFEcEIsZ0JBQU0sRUFBRTtPQUNJLFFBQVEsQ0E2QnBCO0lBQUQsZUFBQztDQTdCRCxBQTZCQyxDQTdCNkIsdUJBQVUsR0E2QnZDO0FBN0JZLDRCQUFRIiwiZmlsZSI6ImVudGl0aWVzL1JlbGlnaW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb2x1bW4sIEVudGl0eSwgSm9pbkNvbHVtbiwgTWFueVRvT25lLCBPbmVUb01hbnksIFByaW1hcnlDb2x1bW59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtEYXRhUmVjb3JkfSBmcm9tICcuL0RhdGFSZWNvcmQnO1xuaW1wb3J0IHtWZXJzZX0gZnJvbSAnLi9WZXJzZSc7XG5pbXBvcnQge1RvbWV9IGZyb20gJy4vVG9tZSc7XG5cbkBFbnRpdHkoKVxuZXhwb3J0IGNsYXNzIFJlbGlnaW9uIGV4dGVuZHMgRGF0YVJlY29yZCB7XG4gICAgQFByaW1hcnlDb2x1bW4oKVxuICAgIGlkITogbnVtYmVyO1xuXG4gICAgQENvbHVtbih7dHlwZTogJ3ZhcmNoYXInLCBsZW5ndGg6IDUwLCBudWxsYWJsZTogZmFsc2V9KVxuICAgIG5hbWUhOiBzdHJpbmc7XG5cbiAgICBAQ29sdW1uKHt0eXBlOiAndmFyY2hhcicsIGxlbmd0aDogNTAsIG51bGxhYmxlOiB0cnVlfSlcbiAgICBhZGhlcmVudHMhOiBzdHJpbmc7XG5cbiAgICBAQ29sdW1uKHt0eXBlOiAndmFyY2hhcicsIGxlbmd0aDogNDA5Nn0pXG4gICAgZGVzY3JpcHRpb24hOiBzdHJpbmc7XG5cbiAgICBAQ29sdW1uKHt0eXBlOiAnc21hbGxpbnQnLCBudWxsYWJsZTogdHJ1ZX0pXG4gICAgcGFyZW50X2lkITogbnVtYmVyO1xuXG4gICAgQENvbHVtbih7dHlwZTogJ3RpbnlpbnQnLCBudWxsYWJsZTogdHJ1ZX0pXG4gICAgc29ydF9vcmRlciE6IG51bWJlcjtcblxuICAgIEBPbmVUb01hbnkoKCkgPT4gVG9tZSwgKHRvbWU6IFRvbWUpID0+IHRvbWUucmVsaWdpb24pXG4gICAgdG9tZXMhOiBUb21lW107XG5cbiAgICBATWFueVRvT25lKCgpID0+IFJlbGlnaW9uLCByZWxpZ2lvbiA9PiByZWxpZ2lvbi5jaGlsZHJlbilcbiAgICBASm9pbkNvbHVtbih7bmFtZTogJ3BhcmVudF9pZCd9KVxuICAgIHBhcmVudCE6IFJlbGlnaW9uO1xuXG4gICAgQE9uZVRvTWFueSgoKSA9PiBSZWxpZ2lvbiwgcmVsaWdpb24gPT4gcmVsaWdpb24ucGFyZW50KVxuICAgIEBKb2luQ29sdW1uKHtuYW1lOiAncGFyZW50X2lkJ30pXG4gICAgY2hpbGRyZW4hOiBSZWxpZ2lvbltdO1xufVxuIl19
