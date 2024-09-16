import { VerseInterface } from '../shared/entity-interfaces/verse.interface';

export class DataPage {
  public numItems = 0;
  public totalItems = 0;
  public totalPages = 0;
  public pageNumber = 0;
  public cleanQuery: string | null = '';
  public verse: VerseInterface | null = null;

  constructor(
    numItems: number,
    totalItems: number,
    totalPages: number,
    pageNumber: number,
    cleanQuery: string | null = null,
    verse: VerseInterface | null = null,
  ) {
    this.numItems = numItems;
    this.totalItems = totalItems;
    this.totalPages = totalPages;
    this.pageNumber = pageNumber;
    this.cleanQuery = cleanQuery;
    this.verse = verse;
  }
}
