import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GridService} from '../grid.service';
import {GridFacetSpec} from './grid-facet.widget';
import {GridPositions} from '../grid.interfaces';

@Component({
    selector: 'grid-facets',
    templateUrl: './grid-facets.widget.html',
    styleUrls: ['./grid-facets.scss']
})
export class GridFacetsWidget {
    @Input() position: GridPositions = 'left';
    @Input() facetSpecs: Array<GridFacetSpec> = [];
    @Output() facetsChange: EventEmitter<Array<GridFacetSpec>> = new EventEmitter<Array<GridFacetSpec>>();

    constructor(public gridService: GridService) {
    }

    public facetChanged() {
        this.facetsChange.emit(this.facetSpecs);
    }
}
