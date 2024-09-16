"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataResult = exports.DATA_RESULT_LIST = exports.DATA_RESULT_SINGLE = exports.DATA_RESULT_ERROR = void 0;
const http_status_codes_1 = require("http-status-codes");
const data_page_1 = require("../../components/data-page");
exports.DATA_RESULT_ERROR = 'E';
exports.DATA_RESULT_SINGLE = 'S';
exports.DATA_RESULT_LIST = 'L';
class DataResult {
    constructor(totalCount, offset, limit, data, cleanQuery = null, verse = null, code = http_status_codes_1.default.OK) {
        this.code = http_status_codes_1.default.OK;
        this.type = exports.DATA_RESULT_SINGLE;
        this.data = [];
        this.page = new data_page_1.DataPage(0, 0, 0, 0);
        if (Array.isArray(data)) {
            this.type = exports.DATA_RESULT_LIST;
            this.data = new Array();
            let totPages = 0;
            let pageNum = 0;
            if (totalCount > 0 && limit > 0) {
                totPages = Math.round(totalCount / limit);
                pageNum = Math.round((offset * limit) / limit);
            }
            this.page = new data_page_1.DataPage(data.length, totalCount, totPages, pageNum, cleanQuery, verse);
        }
        else {
            this.type = exports.DATA_RESULT_SINGLE;
        }
        this.data = data;
        this.code = code;
    }
}
exports.DataResult = DataResult;
//# sourceMappingURL=data-result.js.map