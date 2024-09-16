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
var routing_controllers_1 = require("routing-controllers");
var typeorm_1 = require("typeorm");
var Verse_1 = require("../entities/Verse");
var _violence_words_1 = require("../components/_violence-words");
var _myth_words_1 = require("../components/_myth-words");
var _submission_words_1 = require("../components/_submission-words");
var VerseCharacterization_1 = require("../entities/VerseCharacterization");
var lda = require('lda');
var natural = require('natural');
var wordnet = new natural.WordNet();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVycy9hbmFseXplLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBNEU7QUFDNUUsbUNBQWtEO0FBQ2xELDJDQUF3QztBQUN4QyxpRUFBK0Q7QUFDL0QseURBQXVEO0FBQ3ZELHFFQUFtRTtBQUNuRSwyRUFBd0U7QUFFeEUsSUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNCLElBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxJQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUV0QyxJQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNsRCxJQUFNLFFBQVEsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO0FBSXRDO0lBR0k7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFHLHVCQUFhLEVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBSyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUlELDhCQUFFLEdBQUYsVUFBb0IsTUFBYztRQUZsQyxpQkE2Q0M7UUExQ0csT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDakMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQixJQUFJLFFBQVEsR0FBeUIsSUFBSSxDQUFDO1FBQzFDLFFBQVEsTUFBTSxFQUFFO1lBQ1osS0FBSyxHQUFHO2dCQUNKLFFBQVEsR0FBRyxrQ0FBZ0IsQ0FBQztnQkFDNUIsTUFBTTtZQUNWLEtBQUssR0FBRztnQkFDSixRQUFRLEdBQUcsMEJBQVksQ0FBQztnQkFDeEIsTUFBTTtZQUNWLEtBQUssR0FBRztnQkFDSixRQUFRLEdBQUcsc0NBQWtCLENBQUM7Z0JBQzlCLE1BQU07U0FDYjtRQUNELElBQUksUUFBUSxFQUFFO1lBQ1YsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMvQixJQUFNLGlCQUFpQixHQUFRLEdBQUcsQ0FBQztZQUNuQyxJQUFNLGVBQWEsR0FBRyxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUUxRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsTUFBb0I7Z0JBQ25ELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztnQkFDZCxJQUFJO29CQUNBLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUNwQyxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLGVBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzdELElBQUksR0FBRyxFQUFFOzRCQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ2YsSUFBSSxHQUFHLEdBQUcsSUFBSSw2Q0FBcUIsRUFBRSxDQUFDOzRCQUN0QyxHQUFHLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7NEJBQzVCLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxNQUFNLENBQUM7NEJBQ2pDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQzs0QkFDdEIsR0FBRyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3BFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzt5QkFDZDtxQkFDSjtpQkFDSjtnQkFDRCxPQUFPLFNBQVMsRUFBRTtvQkFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMzQjtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztTQUNOO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVPLHdDQUFZLEdBQXBCLFVBQXFCLFlBQTJCLEVBQUUsSUFBUztRQUN2RCxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDekMsR0FBRyxFQUFFLENBQUM7YUFDVDtTQUNKO1FBQ0QsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDL0UsQ0FBQztJQXRERDtRQUZDLHlCQUFHLENBQUMsYUFBYSxDQUFDO1FBQ2xCLGlDQUFXLENBQUMsR0FBRyxDQUFDO1FBQ2IsV0FBQSwyQkFBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBOzs7OytDQTJDbEI7SUFwRFEsaUJBQWlCO1FBRDdCLG9DQUFjLENBQUMsVUFBVSxDQUFDOztPQUNkLGlCQUFpQixDQWdFN0I7SUFBRCx3QkFBQztDQWhFRCxBQWdFQyxJQUFBO0FBaEVZLDhDQUFpQiIsImZpbGUiOiJjb250cm9sbGVycy9hbmFseXplLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0dldCwgSnNvbkNvbnRyb2xsZXIsIE9uVW5kZWZpbmVkLCBQYXJhbX0gZnJvbSAncm91dGluZy1jb250cm9sbGVycyc7XG5pbXBvcnQge2dldENvbm5lY3Rpb24sIFJlcG9zaXRvcnl9IGZyb20gJ3R5cGVvcm0nO1xuaW1wb3J0IHtWZXJzZX0gZnJvbSAnLi4vZW50aXRpZXMvVmVyc2UnO1xuaW1wb3J0IHt2aW9sZW5jZVdvcmRMaXN0fSBmcm9tICcuLi9jb21wb25lbnRzL192aW9sZW5jZS13b3Jkcyc7XG5pbXBvcnQge215dGhXb3JkTGlzdH0gZnJvbSAnLi4vY29tcG9uZW50cy9fbXl0aC13b3Jkcyc7XG5pbXBvcnQge3N1Ym1pc3Npb25Xb3JkTGlzdH0gZnJvbSAnLi4vY29tcG9uZW50cy9fc3VibWlzc2lvbi13b3Jkcyc7XG5pbXBvcnQge1ZlcnNlQ2hhcmFjdGVyaXphdGlvbn0gZnJvbSAnLi4vZW50aXRpZXMvVmVyc2VDaGFyYWN0ZXJpemF0aW9uJztcblxuY29uc3QgbGRhID0gcmVxdWlyZSgnbGRhJyk7XG5jb25zdCBuYXR1cmFsID0gcmVxdWlyZSgnbmF0dXJhbCcpO1xuY29uc3Qgd29yZG5ldCA9IG5ldyBuYXR1cmFsLldvcmROZXQoKTtcblxuY29uc3QgVG9waWNEZXRlY3Rpb24gPSByZXF1aXJlKCd0b3BpYy1kZXRlY3Rpb24nKTtcbmNvbnN0IGRldGVjdG9yID0gbmV3IFRvcGljRGV0ZWN0aW9uKCk7XG5cblxuQEpzb25Db250cm9sbGVyKCcvYW5hbHl6ZScpXG5leHBvcnQgY2xhc3MgQW5hbHl6ZUNvbnRyb2xsZXIge1xuICAgIHByaXZhdGUgdmVyc2VSZXBvOiBSZXBvc2l0b3J5PFZlcnNlPjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnZlcnNlUmVwbyA9IGdldENvbm5lY3Rpb24oKS5nZXRSZXBvc2l0b3J5KFZlcnNlKTtcbiAgICB9XG5cbiAgICBAR2V0KCcvZ28vOnR5cGVJZCcpXG4gICAgQE9uVW5kZWZpbmVkKDQwNClcbiAgICBnbyhAUGFyYW0oJ3R5cGVJZCcpIHR5cGVJZDogc3RyaW5nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdhbmFseXplOiAnLCB0eXBlSWQpO1xuICAgICAgICBuYXR1cmFsLlBvcnRlclN0ZW1tZXIuYXR0YWNoKCk7XG4gICAgICAgIGxldCB3b3JkTGlzdDogQXJyYXk8c3RyaW5nPiB8IG51bGwgPSBudWxsO1xuICAgICAgICBzd2l0Y2ggKHR5cGVJZCkge1xuICAgICAgICAgICAgY2FzZSAnVic6XG4gICAgICAgICAgICAgICAgd29yZExpc3QgPSB2aW9sZW5jZVdvcmRMaXN0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnTSc6XG4gICAgICAgICAgICAgICAgd29yZExpc3QgPSBteXRoV29yZExpc3Q7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdTJzpcbiAgICAgICAgICAgICAgICB3b3JkTGlzdCA9IHN1Ym1pc3Npb25Xb3JkTGlzdDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAod29yZExpc3QpIHtcbiAgICAgICAgICAgIGNvbnN0IHRtcCA9IHdvcmRMaXN0LmpvaW4oJyAnKTtcbiAgICAgICAgICAgIGNvbnN0IHZTdGVtbWVkV29yZHNUZXh0OiBhbnkgPSB0bXA7XG4gICAgICAgICAgICBjb25zdCB2U3RlbW1lZFdvcmRzID0gdlN0ZW1tZWRXb3Jkc1RleHQudG9rZW5pemVBbmRTdGVtKCk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZlcnNlUmVwby5maW5kKCkudGhlbigodmVyc2VzOiBBcnJheTxWZXJzZT4pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaGl0cyA9IFtdO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmVyc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoaXQgPSB0aGlzLmNoYXJhY3Rlcml6ZSh2U3RlbW1lZFdvcmRzLCB2ZXJzZXNbaV0uYm9keSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGl0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGl0cy5wdXNoKGhpdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlYyA9IG5ldyBWZXJzZUNoYXJhY3Rlcml6YXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWMudmVyc2VfaWQgPSB2ZXJzZXNbaV0uaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjLmNoYXJhY3Rlcml6YXRpb25faWQgPSB0eXBlSWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjLnNjb3JlID0gaGl0LnNjb3JlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlYy5wZXJjZW50ID0gcGFyc2VGbG9hdCgoaGl0LnNjb3JlIC8gaGl0Lm5Xb3JkcyAqIDEwMCkudG9GaXhlZCgxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjLnNhdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihleGNlcHRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaGl0cztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnaW52YWxpZCc7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjaGFyYWN0ZXJpemUoc3RlbW1lZFdvcmRzOiBBcnJheTxzdHJpbmc+LCB0ZXh0OiBhbnkpIHtcbiAgICAgICAgY29uc3QgdGV4dFdvcmRzID0gdGV4dC50b2tlbml6ZUFuZFN0ZW0oKTtcbiAgICAgICAgbGV0IGNudCA9IDA7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGV4dFdvcmRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc3RlbW1lZFdvcmRzLmluZGV4T2YodGV4dFdvcmRzW2ldKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgY250Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNudCA+IDAgPyB7c2NvcmU6IGNudCwgdGV4dDogdGV4dCwgbldvcmRzOiB0ZXh0V29yZHMubGVuZ3RofSA6IG51bGw7XG4gICAgfVxufVxuIl19
