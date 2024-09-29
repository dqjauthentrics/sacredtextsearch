import {getConnection, Repository} from 'typeorm';
import {Verse} from '../../src/entities/Verse';
import {violenceWordList} from '../../src/components/_violence-words';
import {mythWordList} from '../../src/components/_myth-words';
import {submissionWordList} from '../../src/components/_submission-words';
import {VerseCharacterization} from '../../src/entities/verse-characterization';

const lda = require('lda');
const natural = require('natural');
const wordnet = new natural.WordNet();

const TopicDetection = require('topic-detection');
const detector = new TopicDetection();

export class Characterizer {
    private verseRepo: Repository<Verse>;

    constructor() {
        this.verseRepo = getConnection().getRepository(Verse);
    }

    public analyze(typeId: string) {
        natural.PorterStemmer.attach();
        let wordList: Array<string> | null = null;
        switch (typeId) {
            case 'V':
                wordList = violenceWordList;
                break;
            case 'M':
                wordList = mythWordList;
                break;
            case 'S':
                wordList = submissionWordList;
                break;
        }
        if (wordList) {
            const tmp = wordList.join(' ');
            const vStemmedWordsText: any = tmp;
            const vStemmedWords = vStemmedWordsText.tokenizeAndStem();

            return this.verseRepo.find().then((verses: Array<Verse>) => {
                let hits = [];
                try {
                    for (let i = 0; i < verses.length; i++) {
                        const hit = this.characterize(vStemmedWords, verses[i].body);
                        if (hit) {
                            hits.push(hit);
                            let rec = new VerseCharacterization();
                            rec.verseId = verses[i].id;
                            rec.characterizationId = typeId;
                            rec.score = hit.score;
                            rec.percent = parseFloat((hit.score / hit.nWords * 100).toFixed(1));
                            console.log(rec.verseId + ' ' + rec.score + ' ' + rec.percent);
                            this.verseRepo.save(rec).then();
                        }
                    }
                } catch (exception) {
                    console.warn(exception);
                }
                return hits;
            });
        }
        return 'invalid';
    }

    private characterize(stemmedWords: Array<string>, text: any) {
        const textWords = text.tokenizeAndStem();
        let cnt = 0;
        for (let i = 0; i < textWords.length; i++) {
            if (stemmedWords.indexOf(textWords[i]) >= 0) {
                cnt++;
            }
        }
        return cnt > 0 ? {score: cnt, text: text, nWords: textWords.length} : null;
    }
}
