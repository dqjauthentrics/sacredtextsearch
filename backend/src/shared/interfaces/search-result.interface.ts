import { VerseInterface } from '../entity-interfaces/verse.interface';

export interface SearchResultInterface {
  verse: VerseInterface;
  rank: number;
  score: number;
  violence: number;
  myth: number;
  submission: number;
  chapterName: string | null;
  chapterTitle: string | null;
}
