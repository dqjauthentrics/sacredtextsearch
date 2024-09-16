import { Translation } from './translation';
import { Book } from './book';
import { Religion } from './religion';
export declare class Tome {
    id: number;
    name: string;
    hasTranslations: number;
    sortOrder: string;
    abbreviation: string;
    icon: string;
    color: string;
    religionId: number;
    translations: Translation[];
    books: Book[];
    religion: Religion;
}
