"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextAnalysis = void 0;
const _stop_words_1 = require("./_stop-words");
class TextAnalysis {
    buildWordFrequencyList(hits) {
        const fullText = {};
        const list = [];
        if (hits) {
            try {
                for (let i = 0; i < hits.length; i++) {
                    const item = hits[i];
                    const verse = this.cleanText(item.verse.body);
                    const words = this.getWords(verse);
                    for (let j = 0; j < words.length; j++) {
                        const word = words[j];
                        if (fullText[word] === undefined) {
                            fullText[word] = 1;
                        }
                        else {
                            fullText[word]++;
                        }
                    }
                }
                for (let word in fullText) {
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
    }
    cleanText(text) {
        if (text) {
            return text.replace(/[^\w\s]/g, '').trim();
        }
        return '';
    }
    getWords(cleanedText) {
        if (cleanedText) {
            let words = cleanedText.toLowerCase().split(' ');
            return this.strip(words);
        }
        return '';
    }
    strip(words) {
        let newList = [];
        if (words) {
            for (let i = 0; i < words.length; i++) {
                if (_stop_words_1.stopWordList.indexOf(words[i]) < 0) {
                    newList.push(words[i]);
                }
            }
        }
        return newList;
    }
}
exports.TextAnalysis = TextAnalysis;
//# sourceMappingURL=text-analysis.js.map