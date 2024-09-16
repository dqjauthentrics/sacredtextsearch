import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {GridService} from '../grid.service';
import {GRID_DATE_PICKER_CONFIG, GridBlankSpec, GridColSpec, GridConfig, GridItem, GridPositions} from '../grid.interfaces';

import cloneDeep from 'lodash.clonedeep';

@Component({
	selector: 'grid-blank',
	templateUrl: './grid-blank.widget.html',
	styleUrls: ['../grid.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GridBlankWidget implements OnInit {
	@Input() config?: GridConfig;
	@Input() position?: GridPositions;
	@Output() recordAdded: EventEmitter<GridItem> = new EventEmitter<GridItem>();

	public record: any = {};
	public error = '';
	public datePickerConfig = GRID_DATE_PICKER_CONFIG;
	public valColNames: Array<string> = [];
	public dspColNames: Array<string> = [];
	public lookupValues: Array<string | number | undefined | null> = [];

	constructor(public gridService: GridService) {
	}

	public setLookupValue(value: any, colSpec: GridColSpec) {
		this.record[colSpec.name] = value;
	}

	public addRecord() {
		this.error = '';
		if (this.config?.blankSpec) {
			if (this.config.blankSpec.disallowDuplicates) {
				const isDup = this.isDuplicate(this.config.blankSpec, this.record);
				if (!isDup) {
					const item =
						this.gridService.wrapRecord(this.config, cloneDeep(this.record), -1);
					this.recordAdded.emit(item);
					this.initializeRecord();
				} else {
					this.error = 'Duplicate records not allowed';
				}
			} else {
				const item =
					this.gridService.wrapRecord(this.config, cloneDeep(this.record), -1);
				this.recordAdded.emit(item);
				this.initializeRecord();
			}
		}
	}

	public valid(blankSpec: GridBlankSpec): boolean {
		if (blankSpec && blankSpec.colSpecs) {
			for (const colSpec of blankSpec.colSpecs) {
				if (colSpec.required && this.record[colSpec.name] && this.record[colSpec.name].length === 0) {
					return false;
				}
			}
		}
		return !this.isDuplicate(blankSpec, this.record);
	}

	ngOnInit(): void {
		const blankSpec = this.config?.blankSpec;
		if (blankSpec) {
			for (const colSpec of blankSpec.colSpecs) {
				if (colSpec.type === 'lookup') {
					const lookupSpec: any = colSpec.typeSpec;
					const valColName = lookupSpec.valueColName || 'id';
					const dspColName = lookupSpec.displayColName || 'name';
					this.lookupValues.push(null);
					this.valColNames.push(valColName);
					this.dspColNames.push(dspColName);
				} else {
					this.lookupValues.push(null);
					this.valColNames.push('');
					this.dspColNames.push('');
				}
			}
		}
		this.initializeRecord();
	}

	private initializeRecord() {
		if (this.config?.blankSpec && this.config.blankSpec.colSpecs) {
			for (const colSpec of this.config.blankSpec.colSpecs) {
				this.record[colSpec.name] = undefined;
			}
		}
	}

	private recordMatch(colSpecs: Array<GridColSpec>, newRecord: any, itemsRecord: any): boolean {
		let allFieldsMatch = true;
		for (const colSpec of colSpecs) {
			if (newRecord[colSpec.name] !== itemsRecord[colSpec.name]) {
				allFieldsMatch = false;
			}
		}
		return allFieldsMatch;
	}

	private isDuplicate(blankSpec: GridBlankSpec, newRecord: any): boolean {
		if (this.config?.__items && blankSpec.colSpecs) {
			for (const item of this.config.__items) {
				if (this.recordMatch(blankSpec.colSpecs, newRecord, item.record)) {
					return true;
				}
			}
		}
		return false;
	}
}
