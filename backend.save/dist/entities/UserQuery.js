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
var UserQuery = /** @class */ (function (_super) {
    __extends(UserQuery, _super);
    function UserQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryColumn({ type: 'bigint' }),
        __metadata("design:type", Number)
    ], UserQuery.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ type: 'varchar', length: 200, nullable: false }),
        __metadata("design:type", String)
    ], UserQuery.prototype, "terms", void 0);
    __decorate([
        typeorm_1.Column({ type: 'int', nullable: false }),
        __metadata("design:type", Number)
    ], UserQuery.prototype, "usage_count", void 0);
    __decorate([
        typeorm_1.Column({ type: 'tinyint', nullable: false }),
        __metadata("design:type", Number)
    ], UserQuery.prototype, "n_hits", void 0);
    UserQuery = __decorate([
        typeorm_1.Entity()
    ], UserQuery);
    return UserQuery;
}(DataRecord_1.DataRecord));
exports.UserQuery = UserQuery;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnRpdGllcy9Vc2VyUXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQXNEO0FBQ3RELDJDQUF3QztBQUd4QztJQUErQiw2QkFBVTtJQUF6Qzs7SUFZQSxDQUFDO0lBVkc7UUFEQyx1QkFBYSxDQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDOzt5Q0FDcEI7SUFHWjtRQURDLGdCQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDOzs0Q0FDekM7SUFHZjtRQURDLGdCQUFNLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQzs7a0RBQ2xCO0lBR3JCO1FBREMsZ0JBQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBQyxDQUFDOzs2Q0FDM0I7SUFYUCxTQUFTO1FBRHJCLGdCQUFNLEVBQUU7T0FDSSxTQUFTLENBWXJCO0lBQUQsZ0JBQUM7Q0FaRCxBQVlDLENBWjhCLHVCQUFVLEdBWXhDO0FBWlksOEJBQVMiLCJmaWxlIjoiZW50aXRpZXMvVXNlclF1ZXJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb2x1bW4sIEVudGl0eSwgUHJpbWFyeUNvbHVtbn0gZnJvbSAndHlwZW9ybSc7XG5pbXBvcnQge0RhdGFSZWNvcmR9IGZyb20gJy4vRGF0YVJlY29yZCc7XG5cbkBFbnRpdHkoKVxuZXhwb3J0IGNsYXNzIFVzZXJRdWVyeSBleHRlbmRzIERhdGFSZWNvcmQge1xuICAgIEBQcmltYXJ5Q29sdW1uKHt0eXBlOiAnYmlnaW50J30pXG4gICAgaWQhOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKHt0eXBlOiAndmFyY2hhcicsIGxlbmd0aDogMjAwLCBudWxsYWJsZTogZmFsc2V9KVxuICAgIHRlcm1zITogc3RyaW5nO1xuXG4gICAgQENvbHVtbih7dHlwZTogJ2ludCcsIG51bGxhYmxlOiBmYWxzZX0pXG4gICAgdXNhZ2VfY291bnQhOiBudW1iZXI7XG5cbiAgICBAQ29sdW1uKHt0eXBlOiAndGlueWludCcsIG51bGxhYmxlOiBmYWxzZX0pXG4gICAgbl9oaXRzITogbnVtYmVyO1xufVxuIl19
