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
var Sysinfo = /** @class */ (function (_super) {
    __extends(Sysinfo, _super);
    function Sysinfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.Column({ type: 'timestamp', nullable: false }),
        __metadata("design:type", Number)
    ], Sysinfo.prototype, "last_collection_update", void 0);
    Sysinfo = __decorate([
        typeorm_1.Entity()
    ], Sysinfo);
    return Sysinfo;
}(DataRecord_1.DataRecord));
exports.Sysinfo = Sysinfo;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRpdGllcy9TeXNpbmZvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUF1QztBQUN2QywyQ0FBd0M7QUFHeEM7SUFBNkIsMkJBQVU7SUFBdkM7O0lBR0EsQ0FBQztJQURHO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDOzsyREFDYjtJQUZ2QixPQUFPO1FBRG5CLGdCQUFNLEVBQUU7T0FDSSxPQUFPLENBR25CO0lBQUQsY0FBQztDQUhELEFBR0MsQ0FINEIsdUJBQVUsR0FHdEM7QUFIWSwwQkFBTyIsImZpbGUiOiJlbnRpdGllcy9TeXNpbmZvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb2x1bW4sIEVudGl0eX0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQge0RhdGFSZWNvcmR9IGZyb20gJy4vRGF0YVJlY29yZCc7XG5cbkBFbnRpdHkoKVxuZXhwb3J0IGNsYXNzIFN5c2luZm8gZXh0ZW5kcyBEYXRhUmVjb3JkIHtcbiAgICBAQ29sdW1uKHt0eXBlOiAndGltZXN0YW1wJywgbnVsbGFibGU6IGZhbHNlfSlcbiAgICBsYXN0X2NvbGxlY3Rpb25fdXBkYXRlITogbnVtYmVyO1xufVxuIl19
