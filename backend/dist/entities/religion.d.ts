import { Tome } from './tome';
export declare class Religion {
    id: number;
    name: string;
    adherents: string;
    description: string;
    parentId: number;
    sortOrder: number;
    tomes: Tome[];
    parent: Religion;
    children: Religion[];
}
