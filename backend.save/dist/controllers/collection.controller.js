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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = require("routing-controllers");
var typeorm_1 = require("typeorm");
var Tome_1 = require("../entities/Tome");
var DataResult_1 = require("../entities/DataResult");
var Religion_1 = require("../entities/Religion");
var CollectionController = /** @class */ (function () {
    function CollectionController() {
        this.tomeRepo = typeorm_1.getConnection().getRepository(Tome_1.Tome);
        this.religionRepo = typeorm_1.getConnection().getRepository(Religion_1.Religion);
    }
    CollectionController.prototype.list = function () {
        var _this = this;
        return this.tomeRepo.count().then(function (totalCount) {
            return _this.tomeRepo.find({ order: { sort_order: 'ASC' }, where: 'Tome.parent_id IS NULL', relations: ['translations', 'children'] })
                .then(function (tomes) {
                return new DataResult_1.DataResult(totalCount, 0, totalCount, tomes);
            })
                .catch(function (e) {
                process.stderr.write(e + "\n");
            });
        });
    };
    CollectionController.prototype.tree = function () {
        return this.getReligions(null).then(function (religions) {
            var totalCount = religions.length;
            return new DataResult_1.DataResult(totalCount, 0, totalCount, religions);
        });
    };
    CollectionController.prototype.getReligions = function (parentId) {
        return __awaiter(this, void 0, void 0, function () {
            var religions, condition, i, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        religions = [];
                        condition = 'Religion.parent_id IS NULL';
                        if (parentId) {
                            condition = 'Religion.parent_id = ' + parentId.toString();
                        }
                        return [4 /*yield*/, this.religionRepo.find({
                                order: { sort_order: 'ASC' },
                                where: condition,
                                relations: ['tomes', 'tomes.translations']
                            }).then(function (rels) {
                                religions = rels;
                            })];
                    case 1:
                        _b.sent();
                        i = 0;
                        _b.label = 2;
                    case 2:
                        if (!(i < religions.length)) return [3 /*break*/, 5];
                        _a = religions[i];
                        return [4 /*yield*/, this.getReligions(religions[i].id)];
                    case 3:
                        _a.children = _b.sent();
                        _b.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: 
                    // console.log('getReligions:', religions);
                    return [2 /*return*/, religions];
                }
            });
        });
    };
    __decorate([
        routing_controllers_1.Get('/list'),
        routing_controllers_1.OnUndefined(404),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CollectionController.prototype, "list", null);
    __decorate([
        routing_controllers_1.Get('/tree'),
        routing_controllers_1.OnUndefined(404),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], CollectionController.prototype, "tree", null);
    CollectionController = __decorate([
        routing_controllers_1.JsonController('/collection'),
        __metadata("design:paramtypes", [])
    ], CollectionController);
    return CollectionController;
}());
exports.CollectionController = CollectionController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVycy9jb2xsZWN0aW9uLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDJEQUFxRTtBQUNyRSxtQ0FBa0Q7QUFDbEQseUNBQXNDO0FBQ3RDLHFEQUFrRDtBQUNsRCxpREFBOEM7QUFHOUM7SUFJSTtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsdUJBQWEsRUFBRSxDQUFDLGFBQWEsQ0FBQyxXQUFJLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsWUFBWSxHQUFHLHVCQUFhLEVBQUUsQ0FBQyxhQUFhLENBQUMsbUJBQVEsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFJRCxtQ0FBSSxHQUFKO1FBRkEsaUJBWUM7UUFURyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsVUFBZTtZQUM5QyxPQUFPLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQyxFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRSxTQUFTLEVBQUUsQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLEVBQUMsQ0FBQztpQkFDckgsSUFBSSxDQUFDLFVBQUMsS0FBa0I7Z0JBQ3JCLE9BQU8sSUFBSSx1QkFBVSxDQUFPLFVBQVUsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xFLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQyxDQUFDO2dCQUNMLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFJLENBQUMsT0FBSSxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBSUQsbUNBQUksR0FBSjtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxTQUEwQjtZQUMzRCxJQUFNLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQ3BDLE9BQU8sSUFBSSx1QkFBVSxDQUFXLFVBQVUsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVhLDJDQUFZLEdBQTFCLFVBQTJCLFFBQXVCOzs7Ozs7d0JBQzFDLFNBQVMsR0FBb0IsRUFBRSxDQUFDO3dCQUNoQyxTQUFTLEdBQUcsNEJBQTRCLENBQUM7d0JBQzdDLElBQUksUUFBUSxFQUFFOzRCQUNWLFNBQVMsR0FBRyx1QkFBdUIsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7eUJBQzdEO3dCQUNELHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO2dDQUN6QixLQUFLLEVBQUUsRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDO2dDQUMxQixLQUFLLEVBQUUsU0FBUztnQ0FDaEIsU0FBUyxFQUFFLENBQUMsT0FBTyxFQUFFLG9CQUFvQixDQUFDOzZCQUM3QyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBcUI7Z0NBQzFCLFNBQVMsR0FBRyxJQUFJLENBQUM7NEJBQ3JCLENBQUMsQ0FBQyxFQUFBOzt3QkFORixTQU1FLENBQUM7d0JBQ00sQ0FBQyxHQUFHLENBQUM7Ozs2QkFBRSxDQUFBLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFBO3dCQUNoQyxLQUFBLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTt3QkFBWSxxQkFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQTs7d0JBQWhFLEdBQWEsUUFBUSxHQUFHLFNBQXdDLENBQUM7Ozt3QkFEL0IsQ0FBQyxFQUFFLENBQUE7OztvQkFHekMsMkNBQTJDO29CQUMzQyxzQkFBTyxTQUFTLEVBQUM7Ozs7S0FDcEI7SUF2Q0Q7UUFGQyx5QkFBRyxDQUFDLE9BQU8sQ0FBQztRQUNaLGlDQUFXLENBQUMsR0FBRyxDQUFDOzs7O29EQVdoQjtJQUlEO1FBRkMseUJBQUcsQ0FBQyxPQUFPLENBQUM7UUFDWixpQ0FBVyxDQUFDLEdBQUcsQ0FBQzs7OztvREFNaEI7SUE5QlEsb0JBQW9CO1FBRGhDLG9DQUFjLENBQUMsYUFBYSxDQUFDOztPQUNqQixvQkFBb0IsQ0FtRGhDO0lBQUQsMkJBQUM7Q0FuREQsQUFtREMsSUFBQTtBQW5EWSxvREFBb0IiLCJmaWxlIjoiY29udHJvbGxlcnMvY29sbGVjdGlvbi5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtHZXQsIEpzb25Db250cm9sbGVyLCBPblVuZGVmaW5lZH0gZnJvbSAncm91dGluZy1jb250cm9sbGVycyc7XG5pbXBvcnQge2dldENvbm5lY3Rpb24sIFJlcG9zaXRvcnl9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtUb21lfSBmcm9tICcuLi9lbnRpdGllcy9Ub21lJztcbmltcG9ydCB7RGF0YVJlc3VsdH0gZnJvbSAnLi4vZW50aXRpZXMvRGF0YVJlc3VsdCc7XG5pbXBvcnQge1JlbGlnaW9ufSBmcm9tICcuLi9lbnRpdGllcy9SZWxpZ2lvbic7XG5cbkBKc29uQ29udHJvbGxlcignL2NvbGxlY3Rpb24nKVxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25Db250cm9sbGVyIHtcbiAgICBwcml2YXRlIHRvbWVSZXBvOiBSZXBvc2l0b3J5PFRvbWU+O1xuICAgIHByaXZhdGUgcmVsaWdpb25SZXBvOiBSZXBvc2l0b3J5PFJlbGlnaW9uPjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnRvbWVSZXBvID0gZ2V0Q29ubmVjdGlvbigpLmdldFJlcG9zaXRvcnkoVG9tZSk7XG4gICAgICAgIHRoaXMucmVsaWdpb25SZXBvID0gZ2V0Q29ubmVjdGlvbigpLmdldFJlcG9zaXRvcnkoUmVsaWdpb24pO1xuICAgIH1cblxuICAgIEBHZXQoJy9saXN0JylcbiAgICBAT25VbmRlZmluZWQoNDA0KVxuICAgIGxpc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvbWVSZXBvLmNvdW50KCkudGhlbigodG90YWxDb3VudDogYW55KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b21lUmVwby5maW5kKHtvcmRlcjoge3NvcnRfb3JkZXI6ICdBU0MnfSwgd2hlcmU6ICdUb21lLnBhcmVudF9pZCBJUyBOVUxMJywgcmVsYXRpb25zOiBbJ3RyYW5zbGF0aW9ucycsICdjaGlsZHJlbiddfSlcbiAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHRvbWVzOiBBcnJheTxUb21lPikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRhUmVzdWx0PFRvbWU+KHRvdGFsQ291bnQsIDAsIHRvdGFsQ291bnQsIHRvbWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLnN0ZGVyci53cml0ZShgJHtlfVxcbmApO1xuICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgQEdldCgnL3RyZWUnKVxuICAgIEBPblVuZGVmaW5lZCg0MDQpXG4gICAgdHJlZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVsaWdpb25zKG51bGwpLnRoZW4oKHJlbGlnaW9uczogQXJyYXk8UmVsaWdpb24+KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0b3RhbENvdW50ID0gcmVsaWdpb25zLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0YVJlc3VsdDxSZWxpZ2lvbj4odG90YWxDb3VudCwgMCwgdG90YWxDb3VudCwgcmVsaWdpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhc3luYyBnZXRSZWxpZ2lvbnMocGFyZW50SWQ6IG51bWJlciB8IG51bGwpIHtcbiAgICAgICAgbGV0IHJlbGlnaW9uczogQXJyYXk8UmVsaWdpb24+ID0gW107XG4gICAgICAgIGxldCBjb25kaXRpb24gPSAnUmVsaWdpb24ucGFyZW50X2lkIElTIE5VTEwnO1xuICAgICAgICBpZiAocGFyZW50SWQpIHtcbiAgICAgICAgICAgIGNvbmRpdGlvbiA9ICdSZWxpZ2lvbi5wYXJlbnRfaWQgPSAnICsgcGFyZW50SWQudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLnJlbGlnaW9uUmVwby5maW5kKHtcbiAgICAgICAgICAgIG9yZGVyOiB7c29ydF9vcmRlcjogJ0FTQyd9LFxuICAgICAgICAgICAgd2hlcmU6IGNvbmRpdGlvbixcbiAgICAgICAgICAgIHJlbGF0aW9uczogWyd0b21lcycsICd0b21lcy50cmFuc2xhdGlvbnMnXVxuICAgICAgICB9KS50aGVuKChyZWxzOiBBcnJheTxSZWxpZ2lvbj4pID0+IHtcbiAgICAgICAgICAgIHJlbGlnaW9ucyA9IHJlbHM7XG4gICAgICAgIH0pO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlbGlnaW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVsaWdpb25zW2ldLmNoaWxkcmVuID0gYXdhaXQgdGhpcy5nZXRSZWxpZ2lvbnMocmVsaWdpb25zW2ldLmlkKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnZ2V0UmVsaWdpb25zOicsIHJlbGlnaW9ucyk7XG4gICAgICAgIHJldHVybiByZWxpZ2lvbnM7XG4gICAgfVxufVxuIl19
