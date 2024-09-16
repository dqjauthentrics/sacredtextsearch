import {Component, Input} from '@angular/core';
import {SearchService} from '@services/search.service';
import {AgRendererComponent} from 'ag-grid-angular';

@Component({
    selector: 'search-score',
    templateUrl: 'search-score.component.html',
    styleUrls: ['search-score.scss'],
})
export class SearchScoreComponent implements AgRendererComponent {
    @Input() rank: number = 0;

    constructor(public searchService: SearchService) {
    }

    public agInit(params: any): void {
        this.rank = params.value;
    }

    refresh(_params: any): boolean {
        return true;
    }
}
