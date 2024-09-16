import {BookInterface} from './book.interface';
import {TranslationInterface} from './translation.interface';
import {VerseCharacterizationInterface} from './verse-characterization.interface';

export class VerseInterface {
	id!: number;
	verseNumber!: number;
	chapterNumber!: number;
	body!: string;
	compoundId!: number;
	bookId!: number;
	translationId!: number;
	book!: BookInterface;
	translation!: TranslationInterface;
	characterizations!: VerseCharacterizationInterface[];
}
