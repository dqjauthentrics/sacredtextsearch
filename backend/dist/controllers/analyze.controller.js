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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeController = void 0;
const common_1 = require("@nestjs/common");
const verse_1 = require("../entities/verse");
const _violence_words_1 = require("../components/_violence-words");
const _myth_words_1 = require("../components/_myth-words");
const _submission_words_1 = require("../components/_submission-words");
const verse_characterization_1 = require("../entities/verse-characterization");
const natural = require('natural');
let AnalyzeController = class AnalyzeController {
    constructor() {
        this.dataSource = global.ServerConfig.dataSource;
        this.verseRepo = this.dataSource.getRepository(verse_1.Verse);
    }
    go(typeId) {
        natural.PorterStemmer.attach();
        let wordList = null;
        switch (typeId) {
            case 'V':
                wordList = _violence_words_1.violenceWordList;
                break;
            case 'M':
                wordList = _myth_words_1.mythWordList;
                break;
            case 'S':
                wordList = _submission_words_1.submissionWordList;
                break;
        }
        if (wordList) {
            const tmp = wordList.join(' ');
            const vStemmedWordsText = tmp;
            const vStemmedWords = vStemmedWordsText.tokenizeAndStem();
            return this.verseRepo.find().then((verses) => {
                const hits = [];
                try {
                    for (let i = 0; i < verses.length; i++) {
                        const hit = this.characterize(vStemmedWords, verses[i].body);
                        if (hit) {
                            hits.push(hit);
                            const rec = new verse_characterization_1.VerseCharacterization();
                            rec.verseId = verses[i].id;
                            rec.characterizationId = typeId;
                            rec.score = hit.score;
                            rec.percent = parseFloat(((hit.score / hit.nWords) * 100).toFixed(1));
                            this.verseRepo.save(rec).then();
                        }
                    }
                }
                catch (exception) {
                    console.warn(exception);
                }
                return hits;
            });
        }
        return 'invalid';
    }
    characterize(stemmedWords, text) {
        const textWords = text.tokenizeAndStem();
        let cnt = 0;
        for (let i = 0; i < textWords.length; i++) {
            if (stemmedWords.indexOf(textWords[i]) >= 0) {
                cnt++;
            }
        }
        return cnt > 0
            ? { score: cnt, text: text, nWords: textWords.length }
            : null;
    }
};
exports.AnalyzeController = AnalyzeController;
__decorate([
    (0, common_1.Get)('/go/:typeId'),
    __param(0, (0, common_1.Param)('typeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalyzeController.prototype, "go", null);
exports.AnalyzeController = AnalyzeController = __decorate([
    (0, common_1.Controller)('/analyze'),
    __metadata("design:paramtypes", [])
], AnalyzeController);
//# sourceMappingURL=analyze.controller.js.map