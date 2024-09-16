import {Timestamp} from 'rxjs';

export abstract class StampedDataRecordInterface {
	created!: Timestamp<string>;
	modified!: Timestamp<string>;
}
