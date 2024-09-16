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
var DataRecord_1 = require("./DataRecord");
var typeorm_1 = require("typeorm");
var StampedDataRecord = /** @class */ (function (_super) {
    __extends(StampedDataRecord, _super);
    function StampedDataRecord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.CreateDateColumn({ name: 'created', type: 'timestamp', nullable: false }),
        __metadata("design:type", typeorm_1.Timestamp)
    ], StampedDataRecord.prototype, "created", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn({ name: 'modified', type: 'timestamp', nullable: false }),
        __metadata("design:type", typeorm_1.Timestamp)
    ], StampedDataRecord.prototype, "modified", void 0);
    return StampedDataRecord;
}(DataRecord_1.DataRecord));
exports.StampedDataRecord = StampedDataRecord;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRpdGllcy9TdGFtcGVkRGF0YVJlY29yZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBd0M7QUFDeEMsbUNBQXNFO0FBRXRFO0lBQWdELHFDQUFVO0lBQTFEOztJQU1BLENBQUM7SUFKRztRQURDLDBCQUFnQixDQUFDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQztrQ0FDOUQsbUJBQVM7c0RBQUM7SUFHcEI7UUFEQywwQkFBZ0IsQ0FBQyxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUM7a0NBQzlELG1CQUFTO3VEQUFDO0lBQ3pCLHdCQUFDO0NBTkQsQUFNQyxDQU4rQyx1QkFBVSxHQU16RDtBQU5xQiw4Q0FBaUIiLCJmaWxlIjoiZW50aXRpZXMvU3RhbXBlZERhdGFSZWNvcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0RhdGFSZWNvcmR9IGZyb20gJy4vRGF0YVJlY29yZCc7XG5pbXBvcnQge0NyZWF0ZURhdGVDb2x1bW4sIFRpbWVzdGFtcCwgVXBkYXRlRGF0ZUNvbHVtbn0gZnJvbSAndHlwZW9ybSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdGFtcGVkRGF0YVJlY29yZCBleHRlbmRzIERhdGFSZWNvcmQge1xuICAgIEBDcmVhdGVEYXRlQ29sdW1uKHtuYW1lOiAnY3JlYXRlZCcsIHR5cGU6ICd0aW1lc3RhbXAnLCBudWxsYWJsZTogZmFsc2V9KVxuICAgIGNyZWF0ZWQhOiBUaW1lc3RhbXA7XG5cbiAgICBAVXBkYXRlRGF0ZUNvbHVtbih7bmFtZTogJ21vZGlmaWVkJywgdHlwZTogJ3RpbWVzdGFtcCcsIG51bGxhYmxlOiBmYWxzZX0pXG4gICAgbW9kaWZpZWQhOiBUaW1lc3RhbXA7XG59XG4iXX0=
