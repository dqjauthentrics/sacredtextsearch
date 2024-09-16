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
var routing_controllers_1 = require("routing-controllers");
var typeorm_1 = require("typeorm");
var Verse_1 = require("../entities/Verse");
var _violence_words_1 = require("../components/_violence-words");
var _myth_words_1 = require("../components/_myth-words");
var _submission_words_1 = require("../components/_submission-words");
var VerseCharacterization_1 = require("../entities/VerseCharacterization");
// @ts-ignore
var lda = require('lda');
// @ts-ignore
var natural = require('natural');
var wordnet = new natural.WordNet();
// @ts-ignore
var TopicDetection = require('topic-detection');
var detector = new TopicDetection();
var AnalyzeController = /** @class */ (function () {
    function AnalyzeController() {
        this.verseRepo = typeorm_1.getConnection().getRepository(Verse_1.Verse);
    }
    AnalyzeController.prototype.go = function (typeId) {
        var _this = this;
        console.log('analyze: ', typeId);
        natural.PorterStemmer.attach();
        var wordList = null;
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
            var tmp = wordList.join(' ');
            var vStemmedWordsText = tmp;
            var vStemmedWords_1 = vStemmedWordsText.tokenizeAndStem();
            return this.verseRepo.find().then(function (verses) {
                var hits = [];
                try {
                    for (var i = 0; i < verses.length; i++) {
                        var hit = _this.characterize(vStemmedWords_1, verses[i].body);
                        if (hit) {
                            hits.push(hit);
                            var rec = new VerseCharacterization_1.VerseCharacterization();
                            rec.verse_id = verses[i].id;
                            rec.characterization_id = typeId;
                            rec.score = hit.score;
                            rec.percent = parseFloat((hit.score / hit.nWords * 100).toFixed(1));
                            rec.save();
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
    };
    AnalyzeController.prototype.characterize = function (stemmedWords, text) {
        var textWords = text.tokenizeAndStem();
        var cnt = 0;
        for (var i = 0; i < textWords.length; i++) {
            if (stemmedWords.indexOf(textWords[i]) >= 0) {
                cnt++;
            }
        }
        return cnt > 0 ? { score: cnt, text: text, nWords: textWords.length } : null;
    };
    __decorate([
        routing_controllers_1.Get('/go/:typeId'),
        routing_controllers_1.OnUndefined(404),
        __param(0, routing_controllers_1.Param('typeId')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], AnalyzeController.prototype, "go", null);
    AnalyzeController = __decorate([
        routing_controllers_1.JsonController('/analyze'),
        __metadata("design:paramtypes", [])
    ], AnalyzeController);
    return AnalyzeController;
}());
exports.AnalyzeController = AnalyzeController;
