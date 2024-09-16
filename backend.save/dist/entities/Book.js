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
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", Number)
    ], Book.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 100, nullable: false }),
        __metadata("design:type", String)
    ], Book.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinyint', nullable: true }),
        __metadata("design:type", Number)
    ], Book.prototype, "genre_id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 100 }),
        __metadata("design:type", String)
    ], Book.prototype, "sub_title", void 0);
    __decorate([
        typeorm_1.Column({ type: 'int', nullable: true }),
        __metadata("design:type", Number)
    ], Book.prototype, "source_id", void 0);
    __decorate([
        typeorm_1.OneToMany(function () { return Verse_1.Verse; }, function (verse) { return verse.book; }),
        __metadata("design:type", Array)
    ], Book.prototype, "verses", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Tome_1.Tome; }, function (tome) { return tome.books; }),
        typeorm_1.JoinColumn({ name: 'tome_id' }),
        __metadata("design:type", Tome_1.Tome)
    ], Book.prototype, "tome", void 0);
    __decorate([
        typeorm_1.Column({ type: 'smallint', nullable: false }),
        __metadata("design:type", Number)
    ], Book.prototype, "tome_id", void 0);
    Book = __decorate([
        typeorm_1.Entity()
    ], Book);
    return Book;
}(DataRecord_1.DataRecord));
exports.Book = Book;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRpdGllcy9Cb29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUF3RjtBQUN4RiwyQ0FBd0M7QUFDeEMsaUNBQThCO0FBQzlCLCtCQUE0QjtBQUc1QjtJQUEwQix3QkFBVTtJQUFwQzs7SUF3QkEsQ0FBQztJQXRCRztRQURDLHVCQUFhLEVBQUU7O29DQUNKO0lBR1o7UUFEQyxnQkFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQzs7c0NBQzFDO0lBR2Q7UUFEQyxnQkFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUM7OzBDQUN4QjtJQUdsQjtRQURDLGdCQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUMsQ0FBQzs7MkNBQ3BCO0lBR25CO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDOzsyQ0FDbkI7SUFHbkI7UUFEQyxtQkFBUyxDQUFDLGNBQU0sT0FBQSxhQUFLLEVBQUwsQ0FBSyxFQUFFLFVBQUMsS0FBWSxJQUFLLE9BQUEsS0FBSyxDQUFDLElBQUksRUFBVixDQUFVLENBQUM7O3dDQUNwQztJQUlqQjtRQUZDLG1CQUFTLENBQUMsY0FBTSxPQUFBLFdBQUksRUFBSixDQUFJLEVBQUUsVUFBQyxJQUFVLElBQUssT0FBQSxJQUFJLENBQUMsS0FBSyxFQUFWLENBQVUsQ0FBQztRQUNqRCxvQkFBVSxDQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBQyxDQUFDO2tDQUN2QixXQUFJO3NDQUFDO0lBRVo7UUFEQyxnQkFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7O3lDQUMzQjtJQXZCUixJQUFJO1FBRGhCLGdCQUFNLEVBQUU7T0FDSSxJQUFJLENBd0JoQjtJQUFELFdBQUM7Q0F4QkQsQUF3QkMsQ0F4QnlCLHVCQUFVLEdBd0JuQztBQXhCWSxvQkFBSSIsImZpbGUiOiJlbnRpdGllcy9Cb29rLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb2x1bW4sIEVudGl0eSwgSm9pbkNvbHVtbiwgTWFueVRvT25lLCBPbmVUb01hbnksIFByaW1hcnlDb2x1bW59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtEYXRhUmVjb3JkfSBmcm9tICcuL0RhdGFSZWNvcmQnO1xuaW1wb3J0IHtWZXJzZX0gZnJvbSAnLi9WZXJzZSc7XG5pbXBvcnQge1RvbWV9IGZyb20gJy4vVG9tZSc7XG5cbkBFbnRpdHkoKVxuZXhwb3J0IGNsYXNzIEJvb2sgZXh0ZW5kcyBEYXRhUmVjb3JkIHtcbiAgICBAUHJpbWFyeUNvbHVtbigpXG4gICAgaWQhOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKHt0eXBlOiAndmFyY2hhcicsIGxlbmd0aDogMTAwLCBudWxsYWJsZTogZmFsc2V9KVxuICAgIG5hbWUhOiBzdHJpbmc7XG5cbiAgICBAQ29sdW1uKHt0eXBlOiAndGlueWludCcsIG51bGxhYmxlOiB0cnVlfSlcbiAgICBnZW5yZV9pZCE6IG51bWJlcjtcblxuICAgIEBDb2x1bW4oe3R5cGU6ICd2YXJjaGFyJywgbGVuZ3RoOiAxMDB9KVxuICAgIHN1Yl90aXRsZSE6IHN0cmluZztcblxuICAgIEBDb2x1bW4oe3R5cGU6ICdpbnQnLCBudWxsYWJsZTogdHJ1ZX0pXG4gICAgc291cmNlX2lkITogbnVtYmVyO1xuXG4gICAgQE9uZVRvTWFueSgoKSA9PiBWZXJzZSwgKHZlcnNlOiBWZXJzZSkgPT4gdmVyc2UuYm9vaylcbiAgICB2ZXJzZXMhOiBWZXJzZVtdO1xuXG4gICAgQE1hbnlUb09uZSgoKSA9PiBUb21lLCAodG9tZTogVG9tZSkgPT4gdG9tZS5ib29rcylcbiAgICBASm9pbkNvbHVtbih7bmFtZTogJ3RvbWVfaWQnfSlcbiAgICB0b21lITogVG9tZTtcbiAgICBAQ29sdW1uKHt0eXBlOiAnc21hbGxpbnQnLCBudWxsYWJsZTogZmFsc2V9KVxuICAgIHRvbWVfaWQhOiBudW1iZXI7XG59XG4iXX0=
