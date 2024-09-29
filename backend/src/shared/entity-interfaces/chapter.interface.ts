import { VerseInterface } from './verse.interface';

export class ChapterInterface {
  id!: number;
  bookId!: number;
  translationId!: number;
  chapterNumber!: number;
  name!: string;
  title!: string;
  verses?: Array<VerseInterface>;
}
