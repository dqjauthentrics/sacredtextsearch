import {Component, Input} from '@angular/core';
import {GridService} from '../grid.service';
import {GridConfig} from '../grid.interfaces';

@Component({
    selector: 'grid-tiles',
    templateUrl: './grid-tiles.widget.html',
    styleUrls: ['../grid.scss']
})
export class GridTilesWidget {
    @Input() config: GridConfig | undefined;

    constructor(public gridService: GridService) {
    }
}
