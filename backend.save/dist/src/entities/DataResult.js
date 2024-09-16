"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataResult = exports.DataPage = exports.DATA_RESULT_LIST = exports.DATA_RESULT_SINGLE = exports.DATA_RESULT_ERROR = void 0;
var HttpStatus = require('http-status-codes');
exports.DATA_RESULT_ERROR = 'E';
exports.DATA_RESULT_SINGLE = 'S';
exports.DATA_RESULT_LIST = 'L';
var DataPage = /** @class */ (function () {
    function DataPage(numItems, totalItems, totalPages, pageNumber, cleanQuery, verse) {
        if (cleanQuery === void 0) { cleanQuery = null; }
        if (verse === void 0) { verse = null; }
        this.numItems = 0;
        this.totalItems = 0;
        this.totalPages = 0;
        this.pageNumber = 0;
        this.cleanQuery = '';
        this.verse = null;
        this.numItems = numItems;
        this.totalItems = totalItems;
        this.totalPages = totalPages;
        this.pageNumber = pageNumber;
        this.cleanQuery = cleanQuery;
        this.verse = verse;
    }
    return DataPage;
}());
exports.DataPage = DataPage;
var DataResult = /** @class */ (function () {
    function DataResult(totalCount, offset, limit, data, cleanQuery, verse, code) {
        if (cleanQuery === void 0) { cleanQuery = null; }
        if (verse === void 0) { verse = null; }
        if (code === void 0) { code = HttpStatus.OK; }
        this.code = HttpStatus.OK;
        this.type = exports.DATA_RESULT_SINGLE;
        this.data = [];
        this.page = new DataPage(0, 0, 0, 0);
        if (Array.isArray(data)) {
            this.type = exports.DATA_RESULT_LIST;
            this.data = new Array();
            var totPages = 0;
            var pageNum = 0;
            if (totalCount > 0 && limit > 0) {
                totPages = Math.round(totalCount / limit);
                pageNum = Math.round((offset * limit) / limit);
            }
            this.page = new DataPage(data.length, totalCount, totPages, pageNum, cleanQuery, verse);
        }
        else {
            this.type = exports.DATA_RESULT_SINGLE;
        }
        this.data = data;
        this.code = code;
    }
    return DataResult;
}());
exports.DataResult = DataResult;
