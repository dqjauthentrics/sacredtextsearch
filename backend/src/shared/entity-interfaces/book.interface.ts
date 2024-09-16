import {VerseInterface} from './verse.interface';
import {TomeInterface} from './tome.interface';

export class BookInterface {
  id!: number;
  name!: string;
  genreId!: number;
  subTitle!: string;
  sourceId!: number;
  tomeId!: number;
  verses!: VerseInterface[];
  tome!: TomeInterface;
}
