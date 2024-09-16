"use strict";
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
var routing_controllers_1 = require("routing-controllers");
var typeorm_1 = require("typeorm");
var DataResult_1 = require("../entities/DataResult");
var Sysinfo_1 = require("../entities/Sysinfo");
var SysinfoController = /** @class */ (function () {
    function SysinfoController() {
        this.repo = typeorm_1.getConnection().getRepository(Sysinfo_1.Sysinfo);
    }
    SysinfoController.prototype.get = function () {
        return this.repo.findOne()
            .then(function (rec) {
            // console.log(rec);
            return new DataResult_1.DataResult(1, 0, 1, rec);
        })
            .catch(function (e) {
            process.stderr.write(e + "\n");
        });
    };
    __decorate([
        routing_controllers_1.Get('/get'),
        routing_controllers_1.OnUndefined(404),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], SysinfoController.prototype, "get", null);
    SysinfoController = __decorate([
        routing_controllers_1.JsonController('/sysinfo'),
        __metadata("design:paramtypes", [])
    ], SysinfoController);
    return SysinfoController;
}());
exports.SysinfoController = SysinfoController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVycy9zeXNpbmZvLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyREFBcUU7QUFDckUsbUNBQWtEO0FBQ2xELHFEQUFrRDtBQUNsRCwrQ0FBNEM7QUFHNUM7SUFHSTtRQUNJLElBQUksQ0FBQyxJQUFJLEdBQUcsdUJBQWEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxpQkFBTyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUlELCtCQUFHLEdBQUg7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2FBQ2QsSUFBSSxDQUFDLFVBQUMsR0FBUTtZQUNYLG9CQUFvQjtZQUNwQixPQUFPLElBQUksdUJBQVUsQ0FBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxDQUFDO1lBQ0wsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUksQ0FBQyxPQUFJLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBVEQ7UUFGQyx5QkFBRyxDQUFDLE1BQU0sQ0FBQztRQUNYLGlDQUFXLENBQUMsR0FBRyxDQUFDOzs7O2dEQVVoQjtJQWxCUSxpQkFBaUI7UUFEN0Isb0NBQWMsQ0FBQyxVQUFVLENBQUM7O09BQ2QsaUJBQWlCLENBbUI3QjtJQUFELHdCQUFDO0NBbkJELEFBbUJDLElBQUE7QUFuQlksOENBQWlCIiwiZmlsZSI6ImNvbnRyb2xsZXJzL3N5c2luZm8uY29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7R2V0LCBKc29uQ29udHJvbGxlciwgT25VbmRlZmluZWR9IGZyb20gJ3JvdXRpbmctY29udHJvbGxlcnMnO1xuaW1wb3J0IHtnZXRDb25uZWN0aW9uLCBSZXBvc2l0b3J5fSBmcm9tICd0eXBlb3JtJztcbmltcG9ydCB7RGF0YVJlc3VsdH0gZnJvbSAnLi4vZW50aXRpZXMvRGF0YVJlc3VsdCc7XG5pbXBvcnQge1N5c2luZm99IGZyb20gJy4uL2VudGl0aWVzL1N5c2luZm8nO1xuXG5ASnNvbkNvbnRyb2xsZXIoJy9zeXNpbmZvJylcbmV4cG9ydCBjbGFzcyBTeXNpbmZvQ29udHJvbGxlciB7XG4gICAgcHJpdmF0ZSByZXBvOiBSZXBvc2l0b3J5PFN5c2luZm8+O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucmVwbyA9IGdldENvbm5lY3Rpb24oKS5nZXRSZXBvc2l0b3J5KFN5c2luZm8pO1xuICAgIH1cblxuICAgIEBHZXQoJy9nZXQnKVxuICAgIEBPblVuZGVmaW5lZCg0MDQpXG4gICAgZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBvLmZpbmRPbmUoKVxuICAgICAgICAgICAgICAgICAgIC50aGVuKChyZWM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZWMpO1xuICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGFSZXN1bHQ8U3lzaW5mbz4oMSwgMCwgMSwgcmVjKTtcbiAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLnN0ZGVyci53cml0ZShgJHtlfVxcbmApO1xuICAgICAgICAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==
