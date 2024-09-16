import { SearchResultInterface } from '../interfaces/search-result.interface';
import { stopWordList } from './_stop-words';

/**
 * Provides text analysis support for searches.
 */
export interface TextAnalysisFrequencies {
  size: number;
  text: string;
}

export class TextAnalysis {
  public buildWordFrequencyList(hits: Array<SearchResultInterface>) {
    const fullText: any = {};
    const list: Array<TextAnalysisFrequencies> = [];
    if (hits) {
      try {
        for (let i = 0; i < hits.length; i++) {
          const item: any = hits[i];
          const verse = this.cleanText(item.verse.body);
          const words = this.getWords(verse);
          for (let j = 0; j < words.length; j++) {
            const word = words[j];
            if (fullText[word] === undefined) {
              fullText[word] = 1;
            } else {
              fullText[word]++;
            }
          }
        }
        for (const word in fullText) {
          if (fullText.hasOwnProperty(word)) {
            if (fullText[word] > 1) {
              list.push({ size: fullText[word], text: word });
            }
          }
        }
      } catch (exception) {
        console.warn('TextAnalysis Exception:', exception);
      }
    }
    return list;
  }

  public cleanText(text: string) {
    if (text) {
      return text.replace(/[^\w\s]/g, '').trim();
    }
    return '';
  }

  public getWords(cleanedText: string) {
    if (cleanedText) {
      const words = cleanedText.toLowerCase().split(' ');
      return this.strip(words);
    }
    return '';
  }

  public strip(words: Array<string>) {
    const newList: Array<string> = [];
    if (words) {
      for (let i = 0; i < words.length; i++) {
        if (stopWordList.indexOf(words[i]) < 0) {
          newList.push(words[i]);
        }
      }
    }
    return newList;
  }
}
