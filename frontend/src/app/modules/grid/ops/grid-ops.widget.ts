import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {GridConfig, GridOrientations, GridPageState, GridPositions} from '../grid.interfaces';
import {GridService} from '../grid.service';
import {GridFacetSpec} from '../facets/grid-facet.widget';

@Component({
    selector: 'grid-ops',
    templateUrl: './grid-ops.widget.html',
    styleUrls: ['../grid.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GridOpsWidget {
    @Input() orientation: GridOrientations = 'horizontal';
    @Input() position: GridPositions = 'top';
    @Input() config: GridConfig | undefined;
    @Output() paginationChange: EventEmitter<GridPageState> = new EventEmitter<GridPageState>();
    @Output() blankAdded: EventEmitter<any> = new EventEmitter<any>();

    constructor(public gridService: GridService) {
    }

    public recordAdded(record: any) {
        if (this.config) {
            const index = this.config.__items ? this.config.__items.length : 0;
            this.gridService.itemEvent.next({
                listId: this.config.uniqueId,
                eventType: 'append',
                item: this.gridService.wrapRecord(this.config, record, index)
            });
            this.blankAdded.emit(record);
        }
    }

    public facetsChanged(facetSpecs: Array<GridFacetSpec>) {
        if (this.config) {
            this.config.facetSpecs = facetSpecs;
            this.gridService.configChange('facet', this.config);
        }
    }

    public searchChange(query: string) {
        if (this.config) {
            this.config.query = query;
            this.gridService.configChange('query', this.config);
        }
    }

    public pagingChange(state: GridPageState) {
        if (this.config) {
            this.config.pageState = state;
            this.gridService.configChange('paging', this.config);
        }
    }

    public toggleMode() {
        if (this.config) {
            this.gridService.modeToggle(this.config);
            this.paginationChange.emit(this.config.pageState);
        }
    }

    public sizeChange() {
        if (this.config) {
            this.gridService.setPageStops(this.config.pageState);
            this.paginationChange.emit(this.config.pageState);
        }
    }
}
