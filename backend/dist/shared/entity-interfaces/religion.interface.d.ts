import { TomeInterface } from './tome.interface';
export declare class ReligionInterface {
    id: number;
    name: string;
    adherents: string;
    description: string;
    parentId: number;
    sortOrder: number;
    tomes: TomeInterface[];
    parent: ReligionInterface;
    children: ReligionInterface[];
}
