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
var Session = /** @class */ (function (_super) {
    __extends(Session, _super);
    function Session() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Session.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Session.prototype, "expiresAt", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Session.prototype, "data", void 0);
    Session = __decorate([
        typeorm_1.Entity()
    ], Session);
    return Session;
}(typeorm_1.BaseEntity));
exports.Session = Session;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRpdGllcy9TZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFrRTtBQUlsRTtJQUE2QiwyQkFBVTtJQUF2Qzs7SUFTQSxDQUFDO0lBUEc7UUFEQyx1QkFBYSxFQUFFOzt1Q0FDSjtJQUdaO1FBREMsZ0JBQU0sRUFBRTs7OENBQ1U7SUFHbkI7UUFEQyxnQkFBTSxFQUFFOzt5Q0FDSztJQVJMLE9BQU87UUFEbkIsZ0JBQU0sRUFBRTtPQUNJLE9BQU8sQ0FTbkI7SUFBRCxjQUFDO0NBVEQsQUFTQyxDQVQ0QixvQkFBVSxHQVN0QztBQVRZLDBCQUFPIiwiZmlsZSI6ImVudGl0aWVzL1Nlc3Npb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0Jhc2VFbnRpdHksIENvbHVtbiwgRW50aXR5LCBQcmltYXJ5Q29sdW1ufSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7U2Vzc2lvbkVudGl0eX0gZnJvbSAndHlwZW9ybS1zdG9yZSc7XG5cbkBFbnRpdHkoKVxuZXhwb3J0IGNsYXNzIFNlc3Npb24gZXh0ZW5kcyBCYXNlRW50aXR5IGltcGxlbWVudHMgU2Vzc2lvbkVudGl0eSB7XG4gICAgQFByaW1hcnlDb2x1bW4oKVxuICAgIGlkITogc3RyaW5nO1xuXG4gICAgQENvbHVtbigpXG4gICAgZXhwaXJlc0F0ITogbnVtYmVyO1xuXG4gICAgQENvbHVtbigpXG4gICAgZGF0YSE6IHN0cmluZztcbn1cbiJdfQ==
