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
var VerseCharacterization = /** @class */ (function (_super) {
    __extends(VerseCharacterization, _super);
    function VerseCharacterization() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryColumn({ type: 'int' }),
        __metadata("design:type", Number)
    ], VerseCharacterization.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'char', length: 1, nullable: false }),
        __metadata("design:type", String)
    ], VerseCharacterization.prototype, "characterization_id", void 0);
    __decorate([
        typeorm_1.Column({ name: 'verse_id', nullable: false }),
        __metadata("design:type", Number)
    ], VerseCharacterization.prototype, "verse_id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'int', nullable: false }),
        __metadata("design:type", Number)
    ], VerseCharacterization.prototype, "score", void 0);
    __decorate([
        typeorm_1.Column({ type: 'float', nullable: false }),
        __metadata("design:type", Number)
    ], VerseCharacterization.prototype, "percent", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Verse_1.Verse; }, function (verse) { return verse.characterizations; }),
        typeorm_1.JoinColumn({ name: 'verse_id' }),
        __metadata("design:type", VerseCharacterization)
    ], VerseCharacterization.prototype, "verse", void 0);
    VerseCharacterization = __decorate([
        typeorm_1.Entity()
    ], VerseCharacterization);
    return VerseCharacterization;
}(DataRecord_1.DataRecord));
exports.VerseCharacterization = VerseCharacterization;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRpdGllcy9WZXJzZUNoYXJhY3Rlcml6YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQTZFO0FBQzdFLDJDQUF3QztBQUN4QyxpQ0FBOEI7QUFHOUI7SUFBMkMseUNBQVU7SUFBckQ7O0lBbUJBLENBQUM7SUFqQkc7UUFEQyx1QkFBYSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDOztxREFDakI7SUFHWjtRQURDLGdCQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDOztzRUFDdEI7SUFHN0I7UUFEQyxnQkFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7OzJEQUMxQjtJQUdsQjtRQURDLGdCQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQzs7d0RBQ3hCO0lBR2Y7UUFEQyxnQkFBTSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7OzBEQUN4QjtJQUlqQjtRQUZDLG1CQUFTLENBQUMsY0FBTSxPQUFBLGFBQUssRUFBTCxDQUFLLEVBQUUsVUFBQyxLQUFZLElBQUssT0FBQSxLQUFLLENBQUMsaUJBQWlCLEVBQXZCLENBQXVCLENBQUM7UUFDakUsb0JBQVUsQ0FBQyxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQztrQ0FDdkIscUJBQXFCO3dEQUFDO0lBbEJyQixxQkFBcUI7UUFEakMsZ0JBQU0sRUFBRTtPQUNJLHFCQUFxQixDQW1CakM7SUFBRCw0QkFBQztDQW5CRCxBQW1CQyxDQW5CMEMsdUJBQVUsR0FtQnBEO0FBbkJZLHNEQUFxQiIsImZpbGUiOiJlbnRpdGllcy9WZXJzZUNoYXJhY3Rlcml6YXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbHVtbiwgRW50aXR5LCBKb2luQ29sdW1uLCBNYW55VG9PbmUsIFByaW1hcnlDb2x1bW59IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtEYXRhUmVjb3JkfSBmcm9tICcuL0RhdGFSZWNvcmQnO1xuaW1wb3J0IHtWZXJzZX0gZnJvbSAnLi9WZXJzZSc7XG5cbkBFbnRpdHkoKVxuZXhwb3J0IGNsYXNzIFZlcnNlQ2hhcmFjdGVyaXphdGlvbiBleHRlbmRzIERhdGFSZWNvcmQge1xuICAgIEBQcmltYXJ5Q29sdW1uKHt0eXBlOiAnaW50J30pXG4gICAgaWQhOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKHt0eXBlOiAnY2hhcicsIGxlbmd0aDogMSwgbnVsbGFibGU6IGZhbHNlfSlcbiAgICBjaGFyYWN0ZXJpemF0aW9uX2lkITogc3RyaW5nO1xuXG4gICAgQENvbHVtbih7bmFtZTogJ3ZlcnNlX2lkJywgbnVsbGFibGU6IGZhbHNlfSlcbiAgICB2ZXJzZV9pZCE6IG51bWJlcjtcblxuICAgIEBDb2x1bW4oe3R5cGU6ICdpbnQnLCBudWxsYWJsZTogZmFsc2V9KVxuICAgIHNjb3JlITogbnVtYmVyO1xuXG4gICAgQENvbHVtbih7dHlwZTogJ2Zsb2F0JywgbnVsbGFibGU6IGZhbHNlfSlcbiAgICBwZXJjZW50ITogbnVtYmVyO1xuXG4gICAgQE1hbnlUb09uZSgoKSA9PiBWZXJzZSwgKHZlcnNlOiBWZXJzZSkgPT4gdmVyc2UuY2hhcmFjdGVyaXphdGlvbnMpXG4gICAgQEpvaW5Db2x1bW4oe25hbWU6ICd2ZXJzZV9pZCd9KVxuICAgIHZlcnNlITogVmVyc2VDaGFyYWN0ZXJpemF0aW9uO1xufVxuIl19
