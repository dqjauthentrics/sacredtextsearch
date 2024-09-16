import { Book } from './book';
import { Translation } from './translation';
import { VerseCharacterization } from './verse-characterization';
export declare class Verse {
    id: number;
    verseNumber: number;
    chapterNumber: number;
    body: string;
    compoundId: number;
    bookId: number;
    translationId: number;
    book: Book;
    translation: Translation;
    characterizations: VerseCharacterization[];
}
