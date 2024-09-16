import {TranslationInterface} from './translation.interface';
import {BookInterface} from './book.interface';
import {ReligionInterface} from './religion.interface';

export class TomeInterface {
	id!: number;
	name!: string;
	hasTranslations!: number;
	sortOrder!: string;
	abbreviation!: string;
	icon!: string;
	color!: string;
	religionId!: number;
	translations!: TranslationInterface[];
	books!: BookInterface[];
	religion!: ReligionInterface;
}
