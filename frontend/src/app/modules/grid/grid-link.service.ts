import {Injectable} from '@angular/core';
import {GridClickTypes, GridConfig, GridItem} from './grid.interfaces';
import {Router} from '@angular/router';
import {GridService} from './grid.service';

@Injectable()
export class GridLinkService {
	constructor(private router: Router, private gridService: GridService) {
	}

	public parse(item: GridItem, link: string | undefined | null): string | null {
		if (item.record && link) {
			if (link.indexOf('$') >= 0) {
				const parts = link.split('/');
				const newParts: Array<string> = [];
				for (const part of parts) {
					if (part.substring(0, 1) === '$') {
						const colName = part.substring(1);
						if (colName.indexOf('.') > 0) {
							const colNameParts = colName.split('.');
							if (colNameParts && colNameParts.length === 2) {
								const tbl = colNameParts[0];
								const col = colNameParts[1];
								const rec: any = item.record[tbl];
								if (rec) {
									newParts.push(rec[col]);
								}
							}
						} else {
							newParts.push(item.record[colName]);
						}
					} else {
						newParts.push(part);
					}
				}
				link = newParts.join('/');
			}
			return link;
		}
		return null;
	}

	public handleItemClick(config: GridConfig, item: GridItem, clickSpec: GridClickTypes): boolean {
		let itemSelectChange = false;
		let str = '';
		switch (typeof clickSpec) {
			case 'string':
				str = this.parse(item, clickSpec) || '';
				if (str) {
					this.router.navigate([str]).then(/* do nothing */);
				}
				break;
			case 'object':
				str = this.parse(item, clickSpec.path) || '';
				if (str) {
					if (clickSpec.linkType === 'external' && clickSpec.target) {
						window.open(str, clickSpec.target);
					} else {
						this.router.navigate([str]).then(/* do nothing */);
					}
				}
				break;
			case 'function':
				clickSpec(item);
				break;
			default:
				this.gridService.itemEvent.next({listId: config.uniqueId, eventType: 'select', item});
				itemSelectChange = true;
		}
		return itemSelectChange;
	}

}
