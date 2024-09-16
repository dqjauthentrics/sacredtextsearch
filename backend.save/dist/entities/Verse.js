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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRpdGllcy9WZXJzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQ0FBd0Y7QUFDeEYsK0JBQTRCO0FBQzVCLDJDQUF3QztBQUN4Qyw2Q0FBMEM7QUFDMUMsaUVBQThEO0FBRzlEO0lBQTJCLHlCQUFVO0lBQXJDOztJQThCQSxDQUFDO0lBNUJHO1FBREMsdUJBQWEsRUFBRTs7cUNBQ0o7SUFHWjtRQURDLGdCQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7OytDQUNBO0lBR3RCO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzs7aURBQ0U7SUFHeEI7UUFEQyxnQkFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzt1Q0FDVDtJQUdkO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDOzs4Q0FDbEI7SUFJckI7UUFGQyxtQkFBUyxDQUFDLGNBQU0sT0FBQSxXQUFJLEVBQUosQ0FBSSxFQUFFLFVBQUMsSUFBVSxJQUFLLE9BQUEsSUFBSSxDQUFDLE1BQU0sRUFBWCxDQUFXLENBQUM7UUFDbEQsb0JBQVUsQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQztrQ0FDdkIsV0FBSTt1Q0FBQztJQUVaO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDOzswQ0FDMUI7SUFJakI7UUFGQyxtQkFBUyxDQUFDLGNBQU0sT0FBQSx5QkFBVyxFQUFYLENBQVcsRUFBRSxVQUFDLFdBQXdCLElBQUssT0FBQSxXQUFXLENBQUMsTUFBTSxFQUFsQixDQUFrQixDQUFDO1FBQzlFLG9CQUFVLENBQUMsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQztrQ0FDdkIseUJBQVc7OENBQUM7SUFFMUI7UUFEQyxnQkFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQzs7aURBQzFCO0lBR3hCO1FBREMsbUJBQVMsQ0FBQyxjQUFNLE9BQUEsNkNBQXFCLEVBQXJCLENBQXFCLEVBQUUsVUFBQyxnQkFBdUMsSUFBSyxPQUFBLGdCQUFnQixDQUFDLEtBQUssRUFBdEIsQ0FBc0IsQ0FBQzs7b0RBQ2hFO0lBN0JuQyxLQUFLO1FBRGpCLGdCQUFNLEVBQUU7T0FDSSxLQUFLLENBOEJqQjtJQUFELFlBQUM7Q0E5QkQsQUE4QkMsQ0E5QjBCLHVCQUFVLEdBOEJwQztBQTlCWSxzQkFBSyIsImZpbGUiOiJlbnRpdGllcy9WZXJzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29sdW1uLCBFbnRpdHksIEpvaW5Db2x1bW4sIE1hbnlUb09uZSwgT25lVG9NYW55LCBQcmltYXJ5Q29sdW1ufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7Qm9va30gZnJvbSAnLi9Cb29rJztcbmltcG9ydCB7RGF0YVJlY29yZH0gZnJvbSAnLi9EYXRhUmVjb3JkJztcbmltcG9ydCB7VHJhbnNsYXRpb259IGZyb20gJy4vVHJhbnNsYXRpb24nO1xuaW1wb3J0IHtWZXJzZUNoYXJhY3Rlcml6YXRpb259IGZyb20gJy4vVmVyc2VDaGFyYWN0ZXJpemF0aW9uJztcblxuQEVudGl0eSgpXG5leHBvcnQgY2xhc3MgVmVyc2UgZXh0ZW5kcyBEYXRhUmVjb3JkIHtcbiAgICBAUHJpbWFyeUNvbHVtbigpXG4gICAgaWQhOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKHt0eXBlOiAnaW50J30pXG4gICAgdmVyc2VfbnVtYmVyITogbnVtYmVyO1xuXG4gICAgQENvbHVtbih7dHlwZTogJ2ludCd9KVxuICAgIGNoYXB0ZXJfbnVtYmVyITogbnVtYmVyO1xuXG4gICAgQENvbHVtbih7dHlwZTogJ3RleHQnfSlcbiAgICBib2R5ITogc3RyaW5nO1xuXG4gICAgQENvbHVtbih7dHlwZTogJ2ludCcsIG51bGxhYmxlOiBmYWxzZX0pXG4gICAgY29tcG91bmRfaWQhOiBudW1iZXI7XG5cbiAgICBATWFueVRvT25lKCgpID0+IEJvb2ssIChib29rOiBCb29rKSA9PiBib29rLnZlcnNlcylcbiAgICBASm9pbkNvbHVtbih7bmFtZTogJ2Jvb2tfaWQnfSlcbiAgICBib29rITogQm9vaztcbiAgICBAQ29sdW1uKHtuYW1lOiAnYm9va19pZCcsIG51bGxhYmxlOiBmYWxzZX0pXG4gICAgYm9va19pZCE6IG51bWJlcjtcblxuICAgIEBNYW55VG9PbmUoKCkgPT4gVHJhbnNsYXRpb24sICh0cmFuc2xhdGlvbjogVHJhbnNsYXRpb24pID0+IHRyYW5zbGF0aW9uLnZlcnNlcylcbiAgICBASm9pbkNvbHVtbih7bmFtZTogJ3RyYW5zbGF0aW9uX2lkJ30pXG4gICAgdHJhbnNsYXRpb24hOiBUcmFuc2xhdGlvbjtcbiAgICBAQ29sdW1uKHtuYW1lOiAndHJhbnNsYXRpb25faWQnLCBudWxsYWJsZTogZmFsc2V9KVxuICAgIHRyYW5zbGF0aW9uX2lkITogbnVtYmVyO1xuXG4gICAgQE9uZVRvTWFueSgoKSA9PiBWZXJzZUNoYXJhY3Rlcml6YXRpb24sIChjaGFyYWN0ZXJpemF0aW9uOiBWZXJzZUNoYXJhY3Rlcml6YXRpb24pID0+IGNoYXJhY3Rlcml6YXRpb24udmVyc2UpXG4gICAgY2hhcmFjdGVyaXphdGlvbnMhOiBWZXJzZUNoYXJhY3Rlcml6YXRpb25bXTtcbn1cbiJdfQ==
