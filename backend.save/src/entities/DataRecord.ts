import {BaseEntity, PrimaryGeneratedColumn} from 'typeorm';

// Extending BaseEntity exposes the .find(), .save() methods, etc. for any entity that extends this class.
export abstract class DataRecord extends BaseEntity {
    @PrimaryGeneratedColumn({unsigned: true}) id!: number | string;
}
