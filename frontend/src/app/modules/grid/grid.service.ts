import {Injectable, Type} from '@angular/core';
import {
	GRID_DEBUG_LOW,
	GridColFilter,
	GridColSpec,
	GridConfig,
	GridConstraint,
	GridItem,
	GridItemEvent,
	GridListEvent,
	GridModes,
	GridPageState,
	GridPost,
	GridPostFacet
} from './grid.interfaces';
import {Subject} from 'rxjs';
import moment from 'moment';
import _ from 'lodash';
import {GridFacetCandidate} from './facets/grid-facet.widget';
import {GridDataService} from './grid-data.service';

interface FilterComparison {
	name: string;
	type: string;
}

@Injectable()
export class GridService {
	public itemEvent = new Subject<GridItemEvent>();
	public listEvent = new Subject<GridListEvent>();
	public configEvent = new Subject<GridConfig>();
	public customComponents: Type<any>[] = [];
	public highlightIntervalCount = 0;

	private query: string | null | undefined = '';
	private readonly DEFAULT_FACE_MORE_THRESHOLD = 5;
	private readonly DEFAULT_PAGE_SIZE_ROWS = 5;
	private readonly DEFAULT_PAGE_SIZE_TILES = 20;
	private readonly DEFAULT_SIZES = [1, 3, 5, 10, 15, 20, 100];
	private readonly POST_WAIT_MS = 800;

	constructor(private dataService: GridDataService) {
	}

	public arg(value: string | number | null | undefined, defaultValue: string = '0') {
		return '/' + (value ? value : defaultValue);
	}

	public nHits(config: GridConfig) {
		return config.__items ? config.__items.length : 0;
	}

	public setContainerWidth(config: GridConfig, width: number) {
		config.containerWidth = width;
		config.pageState.__maxVisibleStops = 0;
		if (width > 1200) {
			config.pageState.__maxVisibleStops = 15;
		} else if (width > 1000) {
			config.pageState.__maxVisibleStops = 10;
		} else if (width > 900) {
			config.pageState.__maxVisibleStops = 5;
		} else {
			config.pageState.__maxVisibleStops = 3;
		}
		this.setPageStops(config.pageState);
	}

	public setDefaults(config: GridConfig) {
		config.classes = this.ifSet(config.classes, 'container-fluid');
		config.dataUrl = this.ifSet(config.dataUrl, '/grid');
		config.pageState = this.ifSet(config.pageState, {mode: 'tiles', size: this.DEFAULT_PAGE_SIZE_TILES});
		config.searchPlaceholder = this.ifSet(config.searchPlaceholder, 'search filter');
		config.statusActive = this.ifSet(config.statusActive, 'A'); // NB: does not use a constant, so that this module can remain independent
		config.statusDeleted = this.ifSet(config.statusDeleted, 'D'); // NB: does not use a constant, so that this module can remain independent
		config.statusField = this.ifSet(config.statusField, 'status_id');
		config.tableSpec = this.ifSet(config.tableSpec, {tableClass: 'table table-striped'});

		if (config.tableSpec) {
			config.tableSpec.tableClass = this.ifSet(config.tableSpec.tableClass, 'table table-striped');
		}
		config.messageNoRecords = this.ifSet(config.messageNoRecords, 'No matching records.');
		if (!config.containerWidth) {
			config.containerWidth = window.innerWidth;
		}
		if (config.actionsSpec) {
			if (!config.actionsSpec.position) {
				config.actionsSpec.position = 'right';
			}
			if (!config.actionsSpec.orientation) {
				config.actionsSpec.orientation = 'horizontal';
			}
		}
		if (config.facetSpecs) {
			for (const spec of config.facetSpecs) {
				spec.orientation = this.ifSet(spec.orientation, spec.position === 'left' ? 'vertical' : 'horizontal');
				spec.moreThreshold = this.ifSet(spec.moreThreshold, this.DEFAULT_FACE_MORE_THRESHOLD);
			}
		}
		if (config.colSpecs) {
			let i = 0;
			for (const spec of config.colSpecs) {
				spec.__colIndex = i;
				if (!spec.type) {
					spec.type = 'text';
				}
				if (!spec.showMinWidth) {
					spec.showMinWidth = 0;
				}
				if (spec.sortable === undefined) {
					spec.sortable = true;
				}
				spec.__sortColName = typeof spec.sortable === 'string' ? spec.sortable : spec.name;
				if (!spec.heading && spec.name && spec.name.length > 1) {
					spec.heading = spec.name.toUpperCase()
									   .replace(/_/g, ' ')
									   .split(' ')
									   .map(w => {
										   if (w && w.length > 1) {
											   return w[0].toUpperCase() + w.substr(1).toLowerCase();
										   }
										   return '';
									   })
									   .join(' ');
				}
				i++;
			}
		}
		if (config.tileSpec && config.tileSpec.bodyColSpecs && config.colSpecs) {
			for (const bodyColSpec of config.tileSpec.bodyColSpecs) {
				bodyColSpec.__colIndex = 0;
				const colSpec = this.findColSpec(bodyColSpec.name, config.colSpecs);
				if (colSpec) {
					bodyColSpec.__colIndex = colSpec.__colIndex;
				}
			}
		}
	}

	public setNumPages(pageState: GridPageState) {
		if (pageState.total > 0 && pageState.size > 0) {
			pageState.numPages = Math.ceil(pageState.total / pageState.size);
		} else {
			pageState.numPages = 0;
		}
		this.setPageStops(pageState);
		return pageState.numPages;
	}

	public buildPostData(config: GridConfig): GridPost {
		if (config.pageState) {
			const modeSize = config.pageState.mode === 'tiles' ? this.DEFAULT_PAGE_SIZE_TILES : this.DEFAULT_PAGE_SIZE_ROWS;
			if (config.__lastPostData && config.__lastPostData.size !== config.pageState.size) {
				config.pageState.pageNum = 0;
			}
			return {
				offset: config.pageState.pageNum * config.pageState.size,
				size: config.pageState.size ? config.pageState.size : modeSize,
				query: config.query || null,
				sort: config.currentSort ? config.currentSort.__sortColName + (config.currentSortAscending ? ' ASC' : ' DESC') : null,
				filters: this.buildPostFilters(config),
				facets: this.buildPostFacets(config),
				excludeIds: config.excludeIds,
				hardConstraints: config.hardConstraints
			};
		} else { // fallback, should not happen
			return {offset: 0, size: 5, query: null, filters: [], facets: [], sort: null};
		}
	}

	public getSize(mode: GridModes, rowSize = this.DEFAULT_PAGE_SIZE_ROWS, tileSize = this.DEFAULT_PAGE_SIZE_TILES): number {
		return mode === 'tiles' ? tileSize : rowSize;
	}

	public configurePage(viewMode: GridModes = 'tiles', rowSize = this.DEFAULT_PAGE_SIZE_ROWS, tileSize = this.DEFAULT_PAGE_SIZE_TILES): GridPageState {
		const pageSize = this.getSize(viewMode, rowSize, tileSize);
		return {pageNum: 0, size: pageSize, rowSize: rowSize, tileSize: tileSize, count: 0, total: 0, sizes: this.DEFAULT_SIZES, mode: viewMode};
	}

	public refreshItems(callLocation: string, config: GridConfig) {
		this.issueRetrievalRequest(callLocation, config, false, true);
	}

	public setPageStops(pageState: GridPageState) {
		if (!pageState.pageStops || pageState.pageStops.length !== pageState.numPages) {
			setTimeout(() => {
				pageState.pageStops = [];
				pageState.__pageStopShows = [];
				if (!pageState.__maxVisibleStops) {
					pageState.__maxVisibleStops = 5;
				}
				if (pageState.numPages && pageState.total > 0 && pageState.size > 0) {
					for (let i = 0; i < pageState.numPages; i++) {
						pageState.pageStops.push(i);
						pageState.__pageStopShows.push(i < pageState.__maxVisibleStops);
					}
				}
			}, 0);
		}
	}

	public initialize(config: GridConfig): GridConfig {
		config.__initialized = false;
		config.__lastRetrieved = null;
		config.__quadrants = this.ifSet(config.__quadrants, {left: false, top: false, right: false, bottom: false});
		this.setDefaults(config);
		if (!config.suppressInitialLoad) {
			this.refreshItems('initialize', config);
		} else {
			config.__items = [];
			this.finishInitialization(config, null);
		}
		return config;
	}

	public getColNameValue(name: string, item: GridItem) {
		if (name && name.indexOf('.') > 0) {
			const parts = name.split('.');
			const rec: any = item.record[parts[0]];
			if (rec) {
				return rec[parts[1]];
			}
		} else {
			return item.record[name];
		}
	}

	public getColValue(colSpec: GridColSpec, item: GridItem): any {
		if (colSpec) {
			if (colSpec.render) {
				return colSpec.render(item);
			} else if (colSpec.name) {
				return this.getColNameValue(colSpec.name, item);
			}
		}
		return '?';
	}

	public sortColChange(config: GridConfig, colSpec: GridColSpec) {
		if (config.currentSort === colSpec) {
			config.currentSortAscending = !config.currentSortAscending;
		} else {
			config.currentSort = colSpec;
			config.currentSortAscending = true;
		}
		this.refreshItems('sort', config);
	}

	public searchColChange(config: GridConfig, _colSpec: GridColSpec) {
		this.refreshItems('search col', config);
	}

	public configChange(what: string, config: GridConfig) {
		if (what === 'query') {
			this.query = config.query;
		}
		this.refreshItems(what, config);
		this.configEvent.next(config);
	}

	public modeToggle(config: GridConfig) {
		config.pageState.mode = (config.pageState.mode === 'tiles' ? 'rows' : 'tiles');
		config.pageState.size = this.getSize(config.pageState.mode, config.pageState.rowSize, config.pageState.tileSize);
		this.setNumPages(config.pageState);
		this.setPageStops(config.pageState);
	}

	public publishItemEvent(event: GridItemEvent) {
		this.itemEvent.next(event);
	}

	public publishListEvent(config: GridConfig, event: GridListEvent) {
		if (this.showDebug(config, GRID_DEBUG_LOW)) {
			console.log('publishListEvent:', event);
		}
		this.listEvent.next(event);
	}

	public updateFromItemRecord(config: GridConfig, item: GridItem, records: Array<any>, idField = 'id') {
		if (records) {
			for (let i = 0; i < records.length; i++) {
				if (records[i][idField] === item.record[idField]) {
					records[i] = item.record;
				}
			}
		}
	}

	public handleListEvent(_config: GridConfig, _listEvent: GridListEvent) {
	}

	public handleItemEvent(config: GridConfig, itemEvent: GridItemEvent) {
		switch (itemEvent.eventType) {
			case 'splice': // just remove from internal list and re-index, with no further actionsSpec
				if (config.__items && config.__items.length > itemEvent.item.__index) {
					config.__items.splice(itemEvent.item.__index, 1);
					for (let i = 0; i < config.__items.length; i++) {
						config.__items[i].__index = i;
					}
				}
				break;
			case 'remove':
				itemEvent.item.__deleted = true;
				if (config.statusDeleted && config.statusField && itemEvent.item.record[config.statusField]) {
					itemEvent.item.record[config.statusField] = config.statusDeleted;
				}
				break;
			case 'unremove':
				itemEvent.item.__deleted = false;
				if (config.statusActive && config.statusField && itemEvent.item.record[config.statusField]) {
					itemEvent.item.record[config.statusField] = config.statusActive;
				}
				break;
			case 'select': // actually a select toggle
				if (!config.selectMultiple && config.__items) {
					for (const item of config.__items) {
						item.__selected = false;
					}
				}
				itemEvent.item.__selected = !itemEvent.item.__selected;
				break;
			case 'unselect':
				itemEvent.item.__selected = false;
				break;
			case 'append':
				if (!config.__items) {
					config.__items = [];
				}
				config.__items.push(itemEvent.item);
				break;
		}
	}

	public getItemRecords(config: GridConfig, items: Array<GridItem>): Array<any> {
		const records: Array<any> = [];
		if (items) {
			let i = 0;
			for (const item of items) {
				if (config.sortColName) {
					item.record[config.sortColName] = i;
				}
				records.push(item.record);
				i++;
			}
		}
		return records;
	}

	public inlineChangeNotice(config: GridConfig, colSpec: GridColSpec, item: GridItem, value: string | number | undefined) {
		if (value === undefined) {
			value = '';
		}
		if (config.__items && colSpec && colSpec.__colIndex !== undefined) {
			item.__editValues[colSpec.__colIndex] = value;
			if (this.showDebug(config, GRID_DEBUG_LOW)) {
				console.log('inlineChangeNotice:arg item', item);
				console.log('inlineChangeNotice:list item', config.__items[item.__index]);
			}
			this.publishItemEvent({listId: config.uniqueId, eventType: 'modified', item: config.__items[item.__index]});
		}
		return value.toString();
	}

	public inlineSaveNotice(config: GridConfig, item: GridItem) {
		if (config.__items) {
			item.__colValues = _.cloneDeep(item.__editValues);
			for (const spec of config.colSpecs) {
				if (spec.__colIndex !== undefined) {
					item.record[spec.name] = item.__colValues[spec.__colIndex];
				}
			}
			if (this.showDebug(config, GRID_DEBUG_LOW)) {
				console.log('inlineSaveNotice:arg item', item);
				console.log('inlineSaveNotice:list item', config.__items[item.__index]);
			}
			this.publishItemEvent({listId: config.uniqueId, eventType: 'save', item: item});
		}
	}

	public inlineCancelNotice(config: GridConfig, item: GridItem) {
		if (config.__items) {
			item.__editValues = _.cloneDeep(item.__colValues);
			if (this.showDebug(config, GRID_DEBUG_LOW)) {
				console.log('inlineCancelNotice:arg item', item, config.__items[item.__index]);
				console.log('inlineCancelNotice:list item', config.__items[item.__index]);
			}
			this.publishItemEvent({listId: config.uniqueId, eventType: 'save-cancel', item: item});
		}
	}

	public getItemValue(colSpec: GridColSpec, item: GridItem): string | number | null {
		if (colSpec.__colIndex !== undefined) {
			return item.__colValues[colSpec.__colIndex];
		}
		return null;
	}

	public getItemValueAsString(colSpec: GridColSpec, item: GridItem): string {
		let val = this.getItemValue(colSpec, item);
		if (val === null || val === undefined) {
			val = '';
		} else {
			val = val.toString();
		}
		return val;
	}

	public wrapRecord(config: GridConfig, record: any, recordIndex: number): GridItem {
		const item: GridItem = {
			record: record,
			__colValues: [],
			__editValues: [],
			__deleted: false,
			__expanded: false,
			__index: recordIndex,
			__selected: false,
		};
		this.assignColValues(config, item);
		return item;
	}

	public setEditing(config: GridConfig, item: GridItem, isEditing: boolean): void {
		config.__inlineEditingIndex = isEditing ? item.__index : false;
	}

	public unwrapItems(config: GridConfig): Array<any> {
		const records: Array<any> = [];
		if (config.__items) {
			for (const item of config.__items) {
				records.push(item.record);
			}
		}
		return records;
	}

	public findConstraint(colName: string, constraints: Array<GridConstraint> | undefined | null): GridConstraint | null {
		if (constraints) {
			for (const constraint of constraints) {
				if (constraint.colName === colName) {
					return constraint;
				}
			}
		}
		return null;
	}

	public listToFacetItems(listItems: Array<any>, valueColName = 'id', nameColName = 'name'): Array<GridFacetCandidate> {
		const candidates: Array<GridFacetCandidate> = [];
		for (const listItem of listItems) {
			candidates.push({value: listItem[valueColName], name: listItem[nameColName]});
		}
		return candidates;
	}

	private issueRetrievalRequest(callLocation: string, config: GridConfig, calledRecursively = false, forceRetrieval = false): void {
		const now = moment();
		let postData: GridPost | null | undefined = this.buildPostData(config);

		if (this.showDebug(config, GRID_DEBUG_LOW)) {
			console.log('issueRetrievalRequest::start::,from=' + callLocation + '::', postData);
		}

		// Use more recent request if one exists, so when typing we get the latest, ignoring previous things typed in the
		// time gap between retrievals.
		//
		if (calledRecursively) {
			const tmp = _.cloneDeep(config.__pendingPost);
			config.__pendingPost = _.cloneDeep(postData);
			postData = tmp;
		}
		// Check to see if enough time has elapsed between keystrokes/mouse selections to warrant a new query right away.
		// If not, store it in a pending variable and call this routine recursively, later.
		//
		if (config.__lastRetrieved && !config.dataRetrieval) {
			const timeSinceLastChange = moment.duration(now.diff(config.__lastRetrieved)).asMilliseconds();
			const tooSoon = timeSinceLastChange < this.POST_WAIT_MS;
			const tmp = this.postDataChanged(config.__lastPostData, postData);
			const nonPaginationChange = tmp.nonPaginationChange;
			const paginationChange = tmp.paginationChange;
			const changed = nonPaginationChange || paginationChange;
			if (this.showDebug(config, GRID_DEBUG_LOW)) {
				console.log('issueRetrievalRequest::__lastRetrieve::,from=' + callLocation + '::',
					changed, paginationChange, nonPaginationChange, postData);
			}
			if (!changed && !forceRetrieval) {
				postData = null;
			} else if (tooSoon) {
				config.__pendingPost = _.cloneDeep(postData);
				postData = null;
				setTimeout(() => {
					console.log('issueRetrievalRequest::setTimeout', postData);
					this.issueRetrievalRequest('recursive', config, true);
				}, this.POST_WAIT_MS);
			}
			if ((postData && postData.offset === 0) || nonPaginationChange) {
				if (postData) {
					postData.offset = 0;
				}
				config.pageState.pageNum = 0;
			}
		}
		if (this.showDebug(config, GRID_DEBUG_LOW)) {
			console.log('issueRetrievalRequest::after::,from=' + callLocation + '::', postData);
		}
		if (postData || config.dataRetrieval) {
			config.__lastPostData = postData;
			config.__loading = true;
			config.__lastRetrieved = moment();
			this.retrieveData(config, postData);
		}
	}

	private showDebug(config: GridConfig, level: number): boolean {
		return !!config.__debug && config.__debug >= level;
	}

	private findColSpec(colName: string, colSpecs: Array<GridColSpec>): GridColSpec | null {
		for (const colSpec of colSpecs) {
			if (colSpec.name === colName) {
				return colSpec;
			}
		}
		return null;
	}

	private findFilter(filter: GridColFilter, filterList: Array<GridColFilter>): GridColFilter | null {
		if (filterList) {
			for (const listFilter of filterList) {
				if (filter.name === listFilter.name) {
					return listFilter;
				}
			}
		}
		return null;
	}

	private findFacet(facet: GridPostFacet, facetList: Array<GridPostFacet>): GridPostFacet | null {
		if (facetList) {
			for (const listFacet of facetList) {
				if (facet.name === listFacet.name) {
					return listFacet;
				}
			}
		}
		return null;
	}

	private filtersMatch(filters1: Array<any>, filters2: Array<any>, fields: Array<FilterComparison>) {
		if (!filters1 && !filters2) {
			return true;
		}
		if (!filters1 || !filters2) {
			return false;
		}
		if (filters1.length !== filters2.length) {
			return false;
		}
		for (let i = 0; i < filters1.length; i++) {
			for (const field of fields) {
				if (field.type === 'string') {
					if (filters1[i][field.name] !== filters2[i][field.name]) {
						return false;
					}
				} else if (field.type === 'array') {
					if (filters1[i][field.name].length !== filters2[i][field.name].length) {
						return false;
					}
					for (let k = 0; k < filters1[i][field.name].length; k++) {
						if (filters1[i][field.name][k] !== filters2[i][field.name][k]) {
							return false;
						}
					}
				}
			}
		}
		return true;
	}

	private postDataChanged(oldPost: GridPost | null | undefined, newPost: GridPost | null | undefined) {
		if (!oldPost || !newPost) {
			return {changed: true, paginationChange: !oldPost};
		}
		const paginationChange = oldPost.offset !== newPost.offset || oldPost.size !== newPost.size;
		let nonPaginationChange = oldPost.query !== newPost.query || oldPost.sort !== newPost.sort;
		if (!nonPaginationChange) {
			nonPaginationChange = !this.filtersMatch(oldPost.filters, newPost.filters,
				[{name: 'name', type: 'string'}, {name: 'query', type: 'string'}]);
		}
		if (!nonPaginationChange) {
			nonPaginationChange = !this.filtersMatch(oldPost.facets, newPost.facets,
				[{name: 'name', type: 'string'}, {name: 'values', type: 'array'}]);
		}
		return {nonPaginationChange: nonPaginationChange, paginationChange: paginationChange};
	}

	private ifSet(val: any, defaultVal: any) {
		return (val !== undefined ? val : defaultVal);
	}

	private buildPostFilters(config: GridConfig): Array<GridColFilter> {
		const colFilters: Array<GridColFilter> = [];
		if (config.currentFilters) {
			for (const filter of config.currentFilters) {
				colFilters.push({name: filter.name, query: filter.query});
			}
		}
		return colFilters;
	}

	private buildPostFacets(config: GridConfig): Array<GridPostFacet> {
		const facets: Array<GridPostFacet> = [];
		if (config.facetSpecs) {
			for (const facetSpec of config.facetSpecs) {
				if (facetSpec.candidates) {
					const values: Array<string | number> = [];
					for (const candidate of facetSpec.candidates) {
						if (candidate.selected) {
							values.push(candidate.value);
						}
					}
					if (values.length > 0) {
						facets.push({name: facetSpec.colName, values: values});
					}
				}
			}
		}
		return facets;
	}

	private argify(args: Array<number | string | undefined | null>): string {
		let argStr = '';
		if (args && args.length > 0) {
			for (const arg of args) {
				argStr += '/' + (arg ? arg : '0');
			}
		}
		return argStr;
	}

	private assignColValues(config: GridConfig, item: GridItem) {
		if (config.colSpecs) {
			for (const spec of config.colSpecs) {
				item.__colValues.push(this.getColValue(spec, item));
			}
			item.__editValues = _.cloneDeep(item.__colValues);
		}
	}

	private wrapItems(config: GridConfig, records: Array<any>): Array<GridItem> {
		const gridItems: Array<GridItem> = [];
		if (records) {
			let recordIndex = 0;
			for (const record of records) {
				const item = this.wrapRecord(config, record, recordIndex);
				if (config.statusField && config.statusDeleted) {
					item.__deleted = item.record[config.statusField] === config.statusDeleted;
				}
				this.assignColValues(config, item);
				recordIndex++;
				gridItems.push(item);
			}
		}
		return gridItems;
	}

	private finishInitialization(config: GridConfig, query: string | null | undefined) {
		config.__initialized = true;
		config.__loading = false;
		this.publishListEvent(config, {
			listId: config.uniqueId,
			query: query,
			eventType: 'loaded',
			items: config.__items || []
		});
	}

	private retrieveData(config: GridConfig, postData: GridPost | null | undefined): void {
		if (config.dataRetrieval) {
			if (this.showDebug(config, GRID_DEBUG_LOW)) {
				console.log('retrieveData:dataRetrieval()');
			}
			if (config.beforeLoad) {
				config.beforeLoad(config);
			}
			let records = config.dataRetrieval();
			if (this.showDebug(config, GRID_DEBUG_LOW)) {
				console.log('retrieveData items:', records);
			}
			if (config.afterLoad) {
				records = config.afterLoad(records);
			}
			config.__items = this.wrapItems(config, records);
			config.pageState.total = records ? records.length : 0;
			this.finishInitialization(config, postData ? postData.query : this.query);
		} else if (config.dataUrl) {
			if (this.showDebug(config, GRID_DEBUG_LOW)) {
				console.log('retrieveData:service:', config.dataUrl);
			}
			if (config.beforeLoad) {
				config.beforeLoad(config);
			}
			this.dataService.postRetrieveData(config.dataUrl, postData).then((result: any) => {
				if (this.dataService.checkValidResult(result)) {
					if (this.showDebug(config, GRID_DEBUG_LOW)) {
						console.log('retrieveData result:', result);
					}
					try {
						let records = result.data;
						if (config.afterLoad) {
							records = config.afterLoad(records);
						}
						config.__items = this.wrapItems(config, records);
						config.pageState.total = result?.page?.totalItems || 0;
						this.setNumPages(config.pageState);
						this.finishInitialization(config, result.page.cleanQuery ? result.page.cleanQuery : this.query);
					} catch (exception) {
						console.error('data grid retrieval error:', exception);
					}
				} else {
					config.__loading = false;
				}
			});
		}
	}
}
