"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Characterizer = void 0;
var typeorm_1 = require("typeorm");
var Verse_1 = require("../../src/entities/Verse");
var _violence_words_1 = require("../../src/components/_violence-words");
var _myth_words_1 = require("../../src/components/_myth-words");
var _submission_words_1 = require("../../src/components/_submission-words");
var VerseCharacterization_1 = require("../../src/entities/VerseCharacterization");
var lda = require('lda');
var natural = require('natural');
var wordnet = new natural.WordNet();
var TopicDetection = require('topic-detection');
var detector = new TopicDetection();
var Characterizer = /** @class */ (function () {
    function Characterizer() {
        this.verseRepo = typeorm_1.getConnection().getRepository(Verse_1.Verse);
    }
    Characterizer.prototype.analyze = function (typeId) {
        var _this = this;
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
                            console.log(rec.verse_id + ' ' + rec.score + ' ' + rec.percent);
                            rec.save().then();
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
    Characterizer.prototype.characterize = function (stemmedWords, text) {
        var textWords = text.tokenizeAndStem();
        var cnt = 0;
        for (var i = 0; i < textWords.length; i++) {
            if (stemmedWords.indexOf(textWords[i]) >= 0) {
                cnt++;
            }
        }
        return cnt > 0 ? { score: cnt, text: text, nWords: textWords.length } : null;
    };
    return Characterizer;
}());
exports.Characterizer = Characterizer;
