"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
exports.App = void 0;
var bodyParser = require("body-parser");
var express = require("express");
require("reflect-metadata"); // Required by TypeORM.
var routing_controllers_1 = require("routing-controllers");
var typeorm_1 = require("typeorm");
// import {TypeormStore} from 'typeorm-store';
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
                                maxAge: 1000 * 60 * 60, // Milliseconds; 1 hour.
                            }, // @todo These settings may not be appropriate for production. - mdj 14 March 2019
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
                        // this.app.use(session({
                        //     secret: 'ph4ngU14nd',
                        //     resave: false,
                        //     saveUninitialized: false,
                        //     cookie: config.cookie,
                        //     name: 'sidsacred',  // Differentiate from other applications with the same hostname.
                        //     store: new TypeormStore({repository: sessionRepository})
                        // }));
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
