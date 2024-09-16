import { Controller, Get, Param } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Verse } from '../entities/verse';
import { violenceWordList } from '../components/_violence-words';
import { mythWordList } from '../components/_myth-words';
import { submissionWordList } from '../components/_submission-words';
import { VerseCharacterization } from '../entities/verse-characterization';

const natural = require('natural');
// const TopicDetection = require('topic-detection');
// const detector = new TopicDetection();
// const wordnet = new natural.WordNet();
// const lda = require('lda');

@Controller('/analyze')
export class AnalyzeController {
  private verseRepo: Repository<Verse>;
  private readonly dataSource: DataSource;

  constructor() {
    this.dataSource = global.ServerConfig.dataSource;
    this.verseRepo = this.dataSource.getRepository(Verse);
  }

  @Get('/go/:typeId')
  go(@Param('typeId') typeId: string) {
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
        const hits = [];
        try {
          for (let i = 0; i < verses.length; i++) {
            const hit = this.characterize(vStemmedWords, verses[i].body);
            if (hit) {
              hits.push(hit);
              const rec = new VerseCharacterization();
              rec.verseId = verses[i].id;
              rec.characterizationId = typeId;
              rec.score = hit.score;
              rec.percent = parseFloat(
                ((hit.score / hit.nWords) * 100).toFixed(1),
              );
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
    return cnt > 0
      ? { score: cnt, text: text, nWords: textWords.length }
      : null;
  }
}
