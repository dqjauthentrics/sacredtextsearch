"use strict";
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
var bodyParser = require("body-parser");
var express = require("express");
var session = require("express-session");
require("reflect-metadata"); // Required by TypeORM.
var routing_controllers_1 = require("routing-controllers");
var typeorm_1 = require("typeorm");
var typeorm_store_1 = require("typeorm-store");
var search_controller_1 = require("../controllers/search.controller");
var Session_1 = require("../entities/Session");
var collection_controller_1 = require("../controllers/collection.controller");
var sysinfo_controller_1 = require("../controllers/sysinfo.controller");
var analyze_controller_1 = require("../controllers/analyze.controller");
var email_controller_1 = require("../controllers/email.controller");
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.app = express();
        this.initialize()
            .catch(function () {
            _this.gracefulShutdown();
        });
    }
    App.prototype.deploy = function () {
        return this.app;
    };
    App.prototype.timeStamp = function () {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        return date + ' ' + time;
    };
    App.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config_1, sessionRepository, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        config_1 = {
                            address: '',
                            port: process.env.port !== undefined ? parseInt(process.env.port, 10) : 3000,
                            cookie: {
                                httpOnly: true,
                                secure: false,
                                maxAge: 1000 * 60 * 60,
                            },
                        };
                        // Await the creation of a db connection pool manager for TypeORM,
                        // which allows us to use the connection in this file.
                        return [4 /*yield*/, typeorm_1.createConnection()
                                .then(function () {
                                console.log('[sacred] ' + _this.timeStamp() + ': Database connection pool established.');
                            })
                                .catch(function (reason) {
                                console.error('[sacred] ' + _this.timeStamp() + ': Database connection creation error: ' + (reason + "."));
                                process.exit(42);
                            })];
                    case 1:
                        // Await the creation of a db connection pool manager for TypeORM,
                        // which allows us to use the connection in this file.
                        _a.sent();
                        sessionRepository = typeorm_1.getConnection().getRepository(Session_1.Session);
                        // Middleware for working with request and response bodies.
                        this.app.use(bodyParser.json());
                        // Middleware for working with sessions; attaches session information to each Express request object
                        // (req.session).
                        this.app.use(session({
                            secret: 'ph4ngU14nd',
                            resave: false,
                            saveUninitialized: false,
                            cookie: config_1.cookie,
                            name: 'sidsacred',
                            store: new typeorm_store_1.TypeormStore({ repository: sessionRepository })
                        }));
                        /**
                         * Register TypeORM with the app instance. Middleware loaded above will modify the req / res
                         * objects before they reach the controllers.
                         */
                        routing_controllers_1.useExpressServer(this.app, {
                            cors: {
                                origin: [
                                    'ionic://localhost',
                                    'http://localhost:8100',
                                    'http://localhost:8101',
                                    'http://localhost:8111',
                                    'http://localhost:8222',
                                    'http://localhost:8223',
                                    'http://sacredtextsearch.local',
                                    'https://sacredtextsearch.local',
                                    'http://sacredtextsearch.com',
                                    'https://sacredtextsearch.com',
                                    'sacredtextsearch.com'
                                ],
                                credentials: true,
                                optionsSuccessStatus: 204,
                            },
                            defaults: { nullResultCode: 404, undefinedResultCode: 204, paramOptions: { required: true } },
                            errorOverridingMap: {
                                ForbiddenError: { message: 'Access denied.' },
                                ValidationError: { httpCode: '400', message: 'Validation failed.' }
                            },
                            routePrefix: '/api',
                            controllers: [search_controller_1.SearchController, collection_controller_1.CollectionController, sysinfo_controller_1.SysinfoController, analyze_controller_1.AnalyzeController, email_controller_1.EmailController],
                            authorizationChecker: function (action, roles) { return __awaiter(_this, void 0, void 0, function () {
                                var actionSession;
                                return __generator(this, function (_a) {
                                    actionSession = action.request.session;
                                    return [2 /*return*/, !!actionSession.user];
                                });
                            }); }
                        });
                        /**
                         * Primitive / faux error handling. Sets status 500 if no status present on error.
                         * Express's default error handling still occurs after this.
                         */
                        this.app.use(function (err, req, res, next) {
                            if (res.headersSent) {
                                return next(err);
                            }
                            if (!err.statusCode) {
                                err.statusCode = 500;
                            }
                            res.status(err.statusCode).send(err.message);
                        });
                        this.server = this.app.listen(config_1.port, config_1.address, function () {
                            console.log('[sacred] ' + _this.timeStamp() + ': Server listening on port ', config_1.port);
                        }).on('error', function (error) {
                            console.log('[sacred] ' + _this.timeStamp() + ': App error event: ', error);
                        });
                        process.on('SIGTERM', function () {
                            _this.gracefulShutdown();
                        });
                        return [2 /*return*/, new Promise(function (resolve) {
                                resolve(_this.app);
                            })];
                    case 2:
                        e_1 = _a.sent();
                        console.error('[sacred] ' + this.timeStamp() + ': Caught: ' + ("" + e_1));
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                reject();
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Not sure if this is necessary.  A node process will exit automatically, but may not wait for
     * asynchronous things to finish.
     */
    App.prototype.gracefulShutdown = function () {
        var _this = this;
        var connection = typeorm_1.getConnection();
        if (connection) {
            connection.close()
                .then(function () {
                console.log('[sacred - TypeORM] ' + _this.timeStamp() + ': Closing connection pool.');
                if (_this.server) {
                    _this.server.close(function () {
                        console.log('[sacred] ' + _this.timeStamp() + ': Shutting down server.');
                        process.exit(0);
                    });
                }
            });
        }
        else if (this.server) {
            this.server.close(function () {
                console.log('[sacred] ' + _this.timeStamp() + ': Shutting down server.');
                process.exit(0);
            });
        }
    };
    return App;
}());
exports.App = App;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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LENBQUM7Z0JBQ3hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUM7SUFDTCxVQUFDO0FBQUQsQ0FsS0EsQUFrS0MsSUFBQTtBQWxLWSxrQkFBRyIsImZpbGUiOiJhcHAvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGJvZHlQYXJzZXIgPSByZXF1aXJlKCdib2R5LXBhcnNlcicpO1xuaW1wb3J0IGV4cHJlc3MgPSByZXF1aXJlKCdleHByZXNzJyk7XG5pbXBvcnQgc2Vzc2lvbiA9IHJlcXVpcmUoJ2V4cHJlc3Mtc2Vzc2lvbicpO1xuaW1wb3J0IHtDb29raWVPcHRpb25zLCBOZXh0RnVuY3Rpb24sIFJlcXVlc3QsIFJlc3BvbnNlfSBmcm9tICdleHByZXNzJztcbmltcG9ydCB7U2VydmVyfSBmcm9tICdodHRwJztcbmltcG9ydCAncmVmbGVjdC1tZXRhZGF0YSc7IC8vIFJlcXVpcmVkIGJ5IFR5cGVPUk0uXG5pbXBvcnQge0FjdGlvbiwgdXNlRXhwcmVzc1NlcnZlcn0gZnJvbSAncm91dGluZy1jb250cm9sbGVycyc7XG5pbXBvcnQge2NyZWF0ZUNvbm5lY3Rpb24sIGdldENvbm5lY3Rpb24sIFJlcG9zaXRvcnl9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtUeXBlb3JtU3RvcmV9IGZyb20gJ3R5cGVvcm0tc3RvcmUnO1xuaW1wb3J0IHtTZWFyY2hDb250cm9sbGVyfSBmcm9tICcuLi9jb250cm9sbGVycy9zZWFyY2guY29udHJvbGxlcic7XG5pbXBvcnQge1Nlc3Npb259IGZyb20gJy4uL2VudGl0aWVzL1Nlc3Npb24nO1xuaW1wb3J0IHtDb2xsZWN0aW9uQ29udHJvbGxlcn0gZnJvbSAnLi4vY29udHJvbGxlcnMvY29sbGVjdGlvbi5jb250cm9sbGVyJztcbmltcG9ydCB7U3lzaW5mb0NvbnRyb2xsZXJ9IGZyb20gJy4uL2NvbnRyb2xsZXJzL3N5c2luZm8uY29udHJvbGxlcic7XG5pbXBvcnQge0FuYWx5emVDb250cm9sbGVyfSBmcm9tICcuLi9jb250cm9sbGVycy9hbmFseXplLmNvbnRyb2xsZXInO1xuaW1wb3J0IHtFbWFpbEludGVyZmFjZX0gZnJvbSAnLi4vaW50ZXJmYWNlcy9lbWFpbC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtFbWFpbENvbnRyb2xsZXJ9IGZyb20gJy4uL2NvbnRyb2xsZXJzL2VtYWlsLmNvbnRyb2xsZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFwcENvbmZpZyB7XG4gICAgYWRkcmVzczogc3RyaW5nO1xuICAgIHBvcnQ6IG51bWJlcjtcbiAgICBjb29raWU6IENvb2tpZU9wdGlvbnM7XG59XG5cbmV4cG9ydCBjbGFzcyBBcHAge1xuICAgIHByaXZhdGUgcmVhZG9ubHkgYXBwOiBleHByZXNzLkFwcGxpY2F0aW9uO1xuICAgIHByaXZhdGUgc2VydmVyOiBTZXJ2ZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hcHAgPSBleHByZXNzKCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZSgpXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZ3JhY2VmdWxTaHV0ZG93bigpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIGRlcGxveSgpOiBleHByZXNzLkFwcGxpY2F0aW9uIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwO1xuICAgIH1cblxuICAgIHByaXZhdGUgdGltZVN0YW1wKCkge1xuICAgICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGNvbnN0IGRhdGUgPSB0b2RheS5nZXRGdWxsWWVhcigpICsgJy0nICsgKHRvZGF5LmdldE1vbnRoKCkgKyAxKSArICctJyArIHRvZGF5LmdldERhdGUoKTtcbiAgICAgICAgY29uc3QgdGltZSA9IHRvZGF5LmdldEhvdXJzKCkgKyAnOicgKyB0b2RheS5nZXRNaW51dGVzKCkgKyAnOicgKyB0b2RheS5nZXRTZWNvbmRzKCk7XG4gICAgICAgIHJldHVybiBkYXRlICsgJyAnICsgdGltZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFzeW5jIGluaXRpYWxpemUoKTogUHJvbWlzZTxleHByZXNzLkFwcGxpY2F0aW9uIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBjb25maWc6IEFwcENvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiAnJyxcbiAgICAgICAgICAgICAgICBwb3J0OiBwcm9jZXNzLmVudi5wb3J0ICE9PSB1bmRlZmluZWQgPyBwYXJzZUludChwcm9jZXNzLmVudi5wb3J0LCAxMCkgOiAzMDAwLFxuICAgICAgICAgICAgICAgIGNvb2tpZToge1xuICAgICAgICAgICAgICAgICAgICBodHRwT25seTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VjdXJlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgbWF4QWdlOiAxMDAwICogNjAgKiA2MCwgIC8vIE1pbGxpc2Vjb25kczsgMSBob3VyLlxuICAgICAgICAgICAgICAgIH0sICAvLyBAdG9kbyBUaGVzZSBzZXR0aW5ncyBtYXkgbm90IGJlIGFwcHJvcHJpYXRlIGZvciBwcm9kdWN0aW9uLiAtIG1kaiAxNCBNYXJjaCAyMDE5XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBBd2FpdCB0aGUgY3JlYXRpb24gb2YgYSBkYiBjb25uZWN0aW9uIHBvb2wgbWFuYWdlciBmb3IgVHlwZU9STSxcbiAgICAgICAgICAgIC8vIHdoaWNoIGFsbG93cyB1cyB0byB1c2UgdGhlIGNvbm5lY3Rpb24gaW4gdGhpcyBmaWxlLlxuICAgICAgICAgICAgYXdhaXQgY3JlYXRlQ29ubmVjdGlvbigpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW3NhY3JlZF0gJyArIHRoaXMudGltZVN0YW1wKCkgKyAnOiBEYXRhYmFzZSBjb25uZWN0aW9uIHBvb2wgZXN0YWJsaXNoZWQuJyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2gocmVhc29uID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignW3NhY3JlZF0gJyArIHRoaXMudGltZVN0YW1wKCkgKyAnOiBEYXRhYmFzZSBjb25uZWN0aW9uIGNyZWF0aW9uIGVycm9yOiAnICsgYCR7cmVhc29ufS5gKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDQyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gVHlwZWQgYXMgUmVwb3NpdG9yeTxhbnk+IGFzIGEgd29ya2Fyb3VuZCB0byBUeXBlb3JtU3RvcmUgZXhwZWN0aW5nIFJlcG9zaXRvcnk8U2Vzc2lvbkVudGl0eT5cbiAgICAgICAgICAgIC8vIHdoaWNoIGlzIGltcG9zc2libGUsIGFzIGZhciBhcyBJIGNhbiB0ZWxsLlxuICAgICAgICAgICAgY29uc3Qgc2Vzc2lvblJlcG9zaXRvcnk6IFJlcG9zaXRvcnk8YW55PiA9IGdldENvbm5lY3Rpb24oKS5nZXRSZXBvc2l0b3J5KFNlc3Npb24pO1xuXG4gICAgICAgICAgICAvLyBNaWRkbGV3YXJlIGZvciB3b3JraW5nIHdpdGggcmVxdWVzdCBhbmQgcmVzcG9uc2UgYm9kaWVzLlxuICAgICAgICAgICAgdGhpcy5hcHAudXNlKGJvZHlQYXJzZXIuanNvbigpKTtcblxuICAgICAgICAgICAgLy8gTWlkZGxld2FyZSBmb3Igd29ya2luZyB3aXRoIHNlc3Npb25zOyBhdHRhY2hlcyBzZXNzaW9uIGluZm9ybWF0aW9uIHRvIGVhY2ggRXhwcmVzcyByZXF1ZXN0IG9iamVjdFxuICAgICAgICAgICAgLy8gKHJlcS5zZXNzaW9uKS5cbiAgICAgICAgICAgIHRoaXMuYXBwLnVzZShzZXNzaW9uKHtcbiAgICAgICAgICAgICAgICBzZWNyZXQ6ICdwaDRuZ1UxNG5kJyxcbiAgICAgICAgICAgICAgICByZXNhdmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNhdmVVbmluaXRpYWxpemVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb29raWU6IGNvbmZpZy5jb29raWUsXG4gICAgICAgICAgICAgICAgbmFtZTogJ3NpZHNhY3JlZCcsICAvLyBEaWZmZXJlbnRpYXRlIGZyb20gb3RoZXIgYXBwbGljYXRpb25zIHdpdGggdGhlIHNhbWUgaG9zdG5hbWUuXG4gICAgICAgICAgICAgICAgc3RvcmU6IG5ldyBUeXBlb3JtU3RvcmUoe3JlcG9zaXRvcnk6IHNlc3Npb25SZXBvc2l0b3J5fSlcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBSZWdpc3RlciBUeXBlT1JNIHdpdGggdGhlIGFwcCBpbnN0YW5jZS4gTWlkZGxld2FyZSBsb2FkZWQgYWJvdmUgd2lsbCBtb2RpZnkgdGhlIHJlcSAvIHJlc1xuICAgICAgICAgICAgICogb2JqZWN0cyBiZWZvcmUgdGhleSByZWFjaCB0aGUgY29udHJvbGxlcnMuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHVzZUV4cHJlc3NTZXJ2ZXIodGhpcy5hcHAsIHtcbiAgICAgICAgICAgICAgICBjb3JzOiB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2lvbmljOi8vbG9jYWxob3N0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwOi8vbG9jYWxob3N0OjgxMDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHA6Ly9sb2NhbGhvc3Q6ODEwMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cDovL2xvY2FsaG9zdDo4MTExJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwOi8vbG9jYWxob3N0OjgyMjInLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHA6Ly9sb2NhbGhvc3Q6ODIyMycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cDovL3NhY3JlZHRleHRzZWFyY2gubG9jYWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vc2FjcmVkdGV4dHNlYXJjaC5sb2NhbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cDovL3NhY3JlZHRleHRzZWFyY2guY29tJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL3NhY3JlZHRleHRzZWFyY2guY29tJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdzYWNyZWR0ZXh0c2VhcmNoLmNvbSdcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNTdWNjZXNzU3RhdHVzOiAyMDQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0czoge251bGxSZXN1bHRDb2RlOiA0MDQsIHVuZGVmaW5lZFJlc3VsdENvZGU6IDIwNCwgcGFyYW1PcHRpb25zOiB7cmVxdWlyZWQ6IHRydWV9fSxcbiAgICAgICAgICAgICAgICBlcnJvck92ZXJyaWRpbmdNYXA6IHtcbiAgICAgICAgICAgICAgICAgICAgRm9yYmlkZGVuRXJyb3I6IHttZXNzYWdlOiAnQWNjZXNzIGRlbmllZC4nfSxcbiAgICAgICAgICAgICAgICAgICAgVmFsaWRhdGlvbkVycm9yOiB7aHR0cENvZGU6ICc0MDAnLCBtZXNzYWdlOiAnVmFsaWRhdGlvbiBmYWlsZWQuJ31cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJvdXRlUHJlZml4OiAnL2FwaScsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcnM6IFtTZWFyY2hDb250cm9sbGVyLCBDb2xsZWN0aW9uQ29udHJvbGxlciwgU3lzaW5mb0NvbnRyb2xsZXIsIEFuYWx5emVDb250cm9sbGVyLCBFbWFpbENvbnRyb2xsZXJdLFxuICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb25DaGVja2VyOiBhc3luYyAoYWN0aW9uOiBBY3Rpb24sIHJvbGVzOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhY3Rpb25TZXNzaW9uID0gYWN0aW9uLnJlcXVlc3Quc2Vzc2lvbjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhYWN0aW9uU2Vzc2lvbi51c2VyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIFByaW1pdGl2ZSAvIGZhdXggZXJyb3IgaGFuZGxpbmcuIFNldHMgc3RhdHVzIDUwMCBpZiBubyBzdGF0dXMgcHJlc2VudCBvbiBlcnJvci5cbiAgICAgICAgICAgICAqIEV4cHJlc3MncyBkZWZhdWx0IGVycm9yIGhhbmRsaW5nIHN0aWxsIG9jY3VycyBhZnRlciB0aGlzLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmFwcC51c2UoKGVycjogYW55LCByZXE6IFJlcXVlc3QsIHJlczogUmVzcG9uc2UsIG5leHQ6IE5leHRGdW5jdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuaGVhZGVyc1NlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHQoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFlcnIuc3RhdHVzQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICBlcnIuc3RhdHVzQ29kZSA9IDUwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzLnN0YXR1cyhlcnIuc3RhdHVzQ29kZSkuc2VuZChlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIgPSB0aGlzLmFwcC5saXN0ZW4oY29uZmlnLnBvcnQsXG4gICAgICAgICAgICAgICAgY29uZmlnLmFkZHJlc3MsXG4gICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW3NhY3JlZF0gJyArIHRoaXMudGltZVN0YW1wKCkgKyAnOiBTZXJ2ZXIgbGlzdGVuaW5nIG9uIHBvcnQgJywgY29uZmlnLnBvcnQpO1xuICAgICAgICAgICAgICAgIH0pLm9uKCdlcnJvcicsIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbc2FjcmVkXSAnICsgdGhpcy50aW1lU3RhbXAoKSArICc6IEFwcCBlcnJvciBldmVudDogJywgZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHByb2Nlc3Mub24oJ1NJR1RFUk0nLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ncmFjZWZ1bFNodXRkb3duKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGV4cHJlc3MuQXBwbGljYXRpb24+KHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5hcHApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1tzYWNyZWRdICcgKyB0aGlzLnRpbWVTdGFtcCgpICsgJzogQ2F1Z2h0OiAnICsgYCR7ZX1gKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx1bmRlZmluZWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTm90IHN1cmUgaWYgdGhpcyBpcyBuZWNlc3NhcnkuICBBIG5vZGUgcHJvY2VzcyB3aWxsIGV4aXQgYXV0b21hdGljYWxseSwgYnV0IG1heSBub3Qgd2FpdCBmb3JcbiAgICAgKiBhc3luY2hyb25vdXMgdGhpbmdzIHRvIGZpbmlzaC5cbiAgICAgKi9cbiAgICBwcml2YXRlIGdyYWNlZnVsU2h1dGRvd24oKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBnZXRDb25uZWN0aW9uKCk7XG4gICAgICAgIGlmIChjb25uZWN0aW9uKSB7XG4gICAgICAgICAgICBjb25uZWN0aW9uLmNsb3NlKClcbiAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbc2FjcmVkIC0gVHlwZU9STV0gJyArIHRoaXMudGltZVN0YW1wKCkgKyAnOiBDbG9zaW5nIGNvbm5lY3Rpb24gcG9vbC4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VydmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZlci5jbG9zZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1tzYWNyZWRdICcgKyB0aGlzLnRpbWVTdGFtcCgpICsgJzogU2h1dHRpbmcgZG93biBzZXJ2ZXIuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnNlcnZlcikge1xuICAgICAgICAgICAgdGhpcy5zZXJ2ZXIuY2xvc2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdbc2FjcmVkXSAnICsgdGhpcy50aW1lU3RhbXAoKSArICc6IFNodXR0aW5nIGRvd24gc2VydmVyLicpO1xuICAgICAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19
