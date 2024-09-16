import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GridService} from '../grid.service';
import {GridOrientations, GridPositions} from '../grid.interfaces';

export interface GridFacetCandidate {
    name: string;
    value: string | number;
    selected?: boolean;
}

export interface GridFacetSpec {
    // Minimum configuration.
    position: GridPositions;
    colName: string;
    candidates: Array<GridFacetCandidate>;

    // Optional.
    moreThreshold?: number;
    title?: string;
    orientation?: GridOrientations;
    storable?: boolean;
    classes?: string;
}

@Component({
    selector: 'grid-facet',
    templateUrl: './grid-facet.widget.html',
    styleUrls: ['./grid-facets.scss']
})
export class GridFacetWidget {
    @Input() orientation = 'left';
    @Input() facetSpec: GridFacetSpec | undefined;
    @Output() facetChange: EventEmitter<GridFacetSpec> = new EventEmitter<GridFacetSpec>();

    public showAll = false;
    public collapsed = false;

    constructor(public gridService: GridService) {
    }

    public toggle(candidate: GridFacetCandidate) {
        candidate.selected = !candidate.selected;
        if (this.facetSpec) {
            this.facetChanged(this.facetSpec);
        }
    }

    public facetChanged(facetSpec: GridFacetSpec) {
        this.facetChange.emit(facetSpec);
    }
}
