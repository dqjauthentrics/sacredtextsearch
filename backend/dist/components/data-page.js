"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPage = void 0;
class DataPage {
    constructor(numItems, totalItems, totalPages, pageNumber, cleanQuery = null, verse = null) {
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
}
exports.DataPage = DataPage;
//# sourceMappingURL=data-page.js.map