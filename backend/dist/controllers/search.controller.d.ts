import { Verse } from '../entities/verse';
import { SearchResultInterface } from '../interfaces/search-result.interface';
import { GridPostInterface } from '../interfaces/grid-post.interface';
import { Chapter } from '../entities/chapter';
import { DataResult } from '../shared/interfaces/data-result';
export declare class SearchController {
    private debug;
    private bookRepo;
    private chapterRepo;
    private verseRepo;
    private userQueryRepo;
    private readonly dataSource;
    constructor();
    list(offset: number, limit: number): Promise<void | DataResult<Verse>>;
    chapter(bookId: number, translationId: number, chapterNum: number, verseId: number): Promise<DataResult<Chapter>>;
    verseTranslations(bookId: number, chapterNum: number, verseNum: number): Promise<DataResult<SearchResultInterface>>;
    grid(post: GridPostInterface): Promise<void | DataResult<SearchResultInterface>>;
    randomQuery(): Promise<string>;
    clean(query: string | null | undefined): Promise<string>;
    private getBook;
    private getVerse;
    private querify;
    private parseQuery;
    private getOrdering;
    private storeQuery;
    private mapHits;
}
