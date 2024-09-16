import {Component, Input} from '@angular/core';
import {GridService} from '../grid.service';
import {GridConfig} from '../grid.interfaces';

@Component({
    selector: 'grid-debug',
    templateUrl: './grid-debug.widget.html',
    styleUrls: ['../grid.scss', './grid-debug.widget.scss']
})
export class GridDebugWidget {
    @Input() config: GridConfig | undefined;

    constructor(public gridService: GridService) {
    }
}
