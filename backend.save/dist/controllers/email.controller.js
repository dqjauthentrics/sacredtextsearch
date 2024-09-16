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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var nodemailer = require("nodemailer");
var EmailController = /** @class */ (function () {
    function EmailController() {
    }
    EmailController.prototype.send = function (postedData) {
        return __awaiter(this, void 0, void 0, function () {
            var testAccount, transporter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, nodemailer.createTestAccount()];
                    case 1:
                        testAccount = _a.sent();
                        return [4 /*yield*/, nodemailer.createTransport({
                                service: 'gmail',
                                auth: { user: 'dqj@authentrics.com', pass: 'Zarkoff!' }
                            })];
                    case 2:
                        transporter = _a.sent();
                        return [2 /*return*/, transporter.sendMail({
                                from: 'Sacred Text Search <dqj@authentrics.com>',
                                to: 'dqj@authentrics.com',
                                subject: 'Contact from ' + postedData.name,
                                html: '<div>' + postedData.email + '</div><div>' + postedData.body + '</div>'
                            })];
                }
            });
        });
    };
    __decorate([
        routing_controllers_1.Post('/send'),
        routing_controllers_1.OnUndefined(404),
        __param(0, routing_controllers_1.Body()),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], EmailController.prototype, "send", null);
    EmailController = __decorate([
        routing_controllers_1.JsonController('/email')
    ], EmailController);
    return EmailController;
}());
exports.EmailController = EmailController;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVycy9lbWFpbC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBNEU7QUFHNUUsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBR3ZDO0lBQUE7SUEyQkEsQ0FBQztJQXZCUyw4QkFBSSxHQUFWLFVBQW1CLFVBQTBCOzs7Ozs0QkFFdkIscUJBQU0sVUFBVSxDQUFDLGlCQUFpQixFQUFFLEVBQUE7O3dCQUFsRCxXQUFXLEdBQUcsU0FBb0M7d0JBVWxDLHFCQUFNLFVBQVUsQ0FBQyxlQUFlLENBQUM7Z0NBQ2pELE9BQU8sRUFBRSxPQUFPO2dDQUNoQixJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQzs2QkFDeEQsQ0FBQyxFQUFBOzt3QkFISSxXQUFXLEdBQUcsU0FHbEI7d0JBQ0Ysc0JBQU8sV0FBVyxDQUFDLFFBQVEsQ0FBQztnQ0FDeEIsSUFBSSxFQUFFLDBDQUEwQztnQ0FDaEQsRUFBRSxFQUFFLHFCQUFxQjtnQ0FDekIsT0FBTyxFQUFFLGVBQWUsR0FBRyxVQUFVLENBQUMsSUFBSTtnQ0FDMUMsSUFBSSxFQUFFLE9BQU8sR0FBRyxVQUFVLENBQUMsS0FBSyxHQUFHLGFBQWEsR0FBRyxVQUFVLENBQUMsSUFBSSxHQUFHLFFBQVE7NkJBQ2hGLENBQUMsRUFBQzs7OztLQUNOO0lBdEJEO1FBRkMsMEJBQUksQ0FBQyxPQUFPLENBQUM7UUFDYixpQ0FBVyxDQUFDLEdBQUcsQ0FBQztRQUNMLFdBQUEsMEJBQUksRUFBRSxDQUFBOzs7OytDQXNCakI7SUExQlEsZUFBZTtRQUQzQixvQ0FBYyxDQUFDLFFBQVEsQ0FBQztPQUNaLGVBQWUsQ0EyQjNCO0lBQUQsc0JBQUM7Q0EzQkQsQUEyQkMsSUFBQTtBQTNCWSwwQ0FBZSIsImZpbGUiOiJjb250cm9sbGVycy9lbWFpbC5jb250cm9sbGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtCb2R5LCBKc29uQ29udHJvbGxlciwgT25VbmRlZmluZWQsIFBvc3R9IGZyb20gJ3JvdXRpbmctY29udHJvbGxlcnMnO1xuaW1wb3J0IHtFbWFpbEludGVyZmFjZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9lbWFpbC5pbnRlcmZhY2UnO1xuXG52YXIgbm9kZW1haWxlciA9IHJlcXVpcmUoXCJub2RlbWFpbGVyXCIpO1xuXG5ASnNvbkNvbnRyb2xsZXIoJy9lbWFpbCcpXG5leHBvcnQgY2xhc3MgRW1haWxDb250cm9sbGVyIHtcblxuICAgIEBQb3N0KCcvc2VuZCcpXG4gICAgQE9uVW5kZWZpbmVkKDQwNClcbiAgICBhc3luYyBzZW5kKEBCb2R5KCkgcG9zdGVkRGF0YTogRW1haWxJbnRlcmZhY2UpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3RvOiAnICsgcG9zdGVkRGF0YS5lbWFpbCk7XG4gICAgICAgIGxldCB0ZXN0QWNjb3VudCA9IGF3YWl0IG5vZGVtYWlsZXIuY3JlYXRlVGVzdEFjY291bnQoKTtcbiAgICAgICAgLy8gbGV0IHRyYW5zcG9ydGVyID0gYXdhaXQgbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xuICAgICAgICAvLyAgICAgaG9zdDogXCJzbXRwLmV0aGVyZWFsLmVtYWlsXCIsXG4gICAgICAgIC8vICAgICBwb3J0OiA1ODcsXG4gICAgICAgIC8vICAgICBzZWN1cmU6IGZhbHNlLCAvLyB0cnVlIGZvciA0NjUsIGZhbHNlIGZvciBvdGhlciBwb3J0c1xuICAgICAgICAvLyAgICAgYXV0aDoge1xuICAgICAgICAvLyAgICAgICAgIHVzZXI6IHRlc3RBY2NvdW50LnVzZXIsIC8vIGdlbmVyYXRlZCBldGhlcmVhbCB1c2VyXG4gICAgICAgIC8vICAgICAgICAgcGFzczogdGVzdEFjY291bnQucGFzcyAvLyBnZW5lcmF0ZWQgZXRoZXJlYWwgcGFzc3dvcmRcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSk7XG4gICAgICAgIGNvbnN0IHRyYW5zcG9ydGVyID0gYXdhaXQgbm9kZW1haWxlci5jcmVhdGVUcmFuc3BvcnQoe1xuICAgICAgICAgICAgc2VydmljZTogJ2dtYWlsJyxcbiAgICAgICAgICAgIGF1dGg6IHt1c2VyOiAnZHFqQGF1dGhlbnRyaWNzLmNvbScsIHBhc3M6ICdaYXJrb2ZmISd9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJhbnNwb3J0ZXIuc2VuZE1haWwoe1xuICAgICAgICAgICAgZnJvbTogJ1NhY3JlZCBUZXh0IFNlYXJjaCA8ZHFqQGF1dGhlbnRyaWNzLmNvbT4nLFxuICAgICAgICAgICAgdG86ICdkcWpAYXV0aGVudHJpY3MuY29tJyxcbiAgICAgICAgICAgIHN1YmplY3Q6ICdDb250YWN0IGZyb20gJyArIHBvc3RlZERhdGEubmFtZSxcbiAgICAgICAgICAgIGh0bWw6ICc8ZGl2PicgKyBwb3N0ZWREYXRhLmVtYWlsICsgJzwvZGl2PjxkaXY+JyArIHBvc3RlZERhdGEuYm9keSArICc8L2Rpdj4nXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==
