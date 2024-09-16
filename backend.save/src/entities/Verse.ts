import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from 'typeorm';
import {Book} from './Book';
import {DataRecord} from './DataRecord';
import {Translation} from './Translation';
import {VerseCharacterization} from './VerseCharacterization';

@Entity()
export class Verse extends DataRecord {
    @PrimaryColumn()
    id!: number;

    @Column({type: 'int'})
    verse_number!: number;

    @Column({type: 'int'})
    chapter_number!: number;

    @Column({type: 'text'})
    body!: string;

    @Column({type: 'int', nullable: false})
    compound_id!: number;

    @ManyToOne(() => Book, (book: Book) => book.verses)
    @JoinColumn({name: 'book_id'})
    book!: Book;
    @Column({name: 'book_id', nullable: false})
    book_id!: number;

    @ManyToOne(() => Translation, (translation: Translation) => translation.verses)
    @JoinColumn({name: 'translation_id'})
    translation!: Translation;
    @Column({name: 'translation_id', nullable: false})
    translation_id!: number;

    @OneToMany(() => VerseCharacterization, (characterization: VerseCharacterization) => characterization.verse)
    characterizations!: VerseCharacterization[];
}
