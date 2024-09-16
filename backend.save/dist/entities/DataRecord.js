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
// Extending BaseEntity exposes the .find(), .save() methods, etc. for any entity that extends this class.
var DataRecord = /** @class */ (function (_super) {
    __extends(DataRecord, _super);
    function DataRecord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ unsigned: true }),
        __metadata("design:type", Object)
    ], DataRecord.prototype, "id", void 0);
    return DataRecord;
}(typeorm_1.BaseEntity));
exports.DataRecord = DataRecord;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRpdGllcy9EYXRhUmVjb3JkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUEyRDtBQUUzRCwwR0FBMEc7QUFDMUc7SUFBeUMsOEJBQVU7SUFBbkQ7O0lBRUEsQ0FBQztJQUQ2QztRQUF6QyxnQ0FBc0IsQ0FBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQzs7MENBQXNCO0lBQ25FLGlCQUFDO0NBRkQsQUFFQyxDQUZ3QyxvQkFBVSxHQUVsRDtBQUZxQixnQ0FBVSIsImZpbGUiOiJlbnRpdGllcy9EYXRhUmVjb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCYXNlRW50aXR5LCBQcmltYXJ5R2VuZXJhdGVkQ29sdW1ufSBmcm9tICd0eXBlb3JtJztcblxuLy8gRXh0ZW5kaW5nIEJhc2VFbnRpdHkgZXhwb3NlcyB0aGUgLmZpbmQoKSwgLnNhdmUoKSBtZXRob2RzLCBldGMuIGZvciBhbnkgZW50aXR5IHRoYXQgZXh0ZW5kcyB0aGlzIGNsYXNzLlxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGFSZWNvcmQgZXh0ZW5kcyBCYXNlRW50aXR5IHtcbiAgICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbih7dW5zaWduZWQ6IHRydWV9KSBpZCE6IG51bWJlciB8IHN0cmluZztcbn1cbiJdfQ==
