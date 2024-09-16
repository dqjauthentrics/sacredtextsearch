import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GridPageState} from '../grid.interfaces';
import {GridService} from '../grid.service';

@Component({
    selector: 'grid-paginator',
    templateUrl: './grid-paginator.widget.html',
    styleUrls: ['./grid-paginator.scss']
})
export class GridPaginatorWidget {
    @Input() state: GridPageState | undefined;
    @Output() paginationChange: EventEmitter<GridPageState> = new EventEmitter<GridPageState>();

    constructor(public gridService: GridService) {
    }

    public changed(pageStop: number) {
        if (this.state) {
            this.state.pageNum = pageStop;
            this.setShows();
            this.paginationChange.emit(this.state);
        }
    }

    public showStop(pageBtnNum: number) {
        if (this.state && this.state.pageStops) {
            const maxStops: number = this.state.__maxVisibleStops || 10;
            const nPages: number = this.state.numPages || 0;
            const half: number = Math.ceil(maxStops / 2);
            let pageMin = Math.max(this.state.pageNum - half, 0);
            const pageMax = Math.min(pageMin + maxStops - 1, nPages - 1);
            while (pageMax - pageMin + 1 < maxStops && pageMin > 0) {
                pageMin--;
            }
            const showIt = (pageBtnNum >= pageMin && pageBtnNum <= pageMax);
            // console.log('maxStops=' + maxStops + ', p=' + this.state.pageNum + ', b=' + pageBtnNum + ', min=' + pageMin + ', max=' + pageMax + ', sh=' + showIt);
            return showIt;
        }
        return true;
    }

    public first() {
        if (this.state) {
            this.state.pageNum = 0;
            this.setShows();
            this.paginationChange.emit(this.state);
        }
    }

    public last() {
        if (this.state) {
            if (!this.state.numPages) {
                this.state.numPages = 0;
            }
            this.state.pageNum = this.state.numPages - 1;
            this.setShows();
            this.paginationChange.emit(this.state);
        }
    }

    public next() {
        if (this.state) {
            if (!this.state.numPages) {
                this.state.numPages = 0;
                this.setShows();
            } else {
                if (this.state.pageNum < this.state.numPages - 1) {
                    this.state.pageNum++;
                    this.setShows();
                    this.paginationChange.emit(this.state);
                }
            }
        }
    }

    public previous() {
        if (this.state) {
            if (this.state.pageNum > 0) {
                this.state.pageNum--;
                this.setShows();
                this.paginationChange.emit(this.state);
            }
        }
    }

    private setShows() {
        if (this.state && this.state.pageStops && this.state.__pageStopShows) {
            for (let i = 0; i < this.state.pageStops.length; i++) {
                this.state.__pageStopShows[i] = this.showStop(i);
            }
        }
    }
}
