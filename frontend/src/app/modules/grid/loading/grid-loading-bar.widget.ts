import {Component, Input} from '@angular/core';

@Component({
    selector: 'grid-loading-bar',
    styleUrls: ['../grid.scss', './grid-loading-bar.widget.scss'],
    templateUrl: './grid-loading-bar.widget.html'
})

export class GridLoadingBarWidget {
    @Input() loading = false;
}
