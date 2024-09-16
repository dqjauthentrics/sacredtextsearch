"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app/app");
var app = new app_1.App().deploy();
exports.default = { app: app };
