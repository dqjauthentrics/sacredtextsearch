"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAnalysis = void 0;
var _stop_words_1 = require("./_stop-words");
var TextAnalysis = /** @class */ (function () {
    function TextAnalysis() {
    }
    TextAnalysis.prototype.buildWordFrequencyList = function (hits) {
        var fullText = {};
        var list = [];
        if (hits) {
            try {
                for (var i = 0; i < hits.length; i++) {
                    var item = hits[i];
                    var verse = this.cleanText(item.verse.body);
                    var words = this.getWords(verse);
                    for (var j = 0; j < words.length; j++) {
                        var word = words[j];
                        if (fullText[word] === undefined) {
                            fullText[word] = 1;
                        }
                        else {
                            fullText[word]++;
                        }
                    }
                }
                for (var word in fullText) {
                    if (fullText.hasOwnProperty(word)) {
                        if (fullText[word] > 1) {
                            list.push({ size: fullText[word], text: word });
                        }
                    }
                }
            }
            catch (exception) {
                console.warn('TextAnalysis Exception:', exception);
            }
        }
        return list;
    };
    TextAnalysis.prototype.cleanText = function (text) {
        if (text) {
            return text.replace(/[^\w\s]/g, '').trim();
        }
        return '';
    };
    TextAnalysis.prototype.getWords = function (cleanedText) {
        if (cleanedText) {
            var words = cleanedText.toLowerCase().split(' ');
            return this.strip(words);
        }
        return '';
    };
    TextAnalysis.prototype.strip = function (words) {
        var newList = [];
        if (words) {
            for (var i = 0; i < words.length; i++) {
                if (_stop_words_1.stopWordList.indexOf(words[i]) < 0) {
                    newList.push(words[i]);
                }
            }
        }
        return newList;
    };
    return TextAnalysis;
}());
exports.TextAnalysis = TextAnalysis;
