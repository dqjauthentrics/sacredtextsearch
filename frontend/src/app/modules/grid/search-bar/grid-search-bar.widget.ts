import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {GridSearchModes} from '../grid.interfaces';

@Component({
    selector: 'grid-search-bar',
    templateUrl: './grid-search-bar.widget.html',
    styleUrls: ['./grid-search-bar.widget.scss']
})

export class GridSearchBarWidget implements OnInit, AfterViewInit {
    @Input() query = '';
    @Input() mode: GridSearchModes = 'immediate';
    @Input() placeholder = 'search';
    @Input() autoFocusOn = true;
    @Output() queryChange: EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('searchInput', {static: false}) searchInput: ElementRef | null = null;

    ngOnInit(): void {
        if (!this.mode) {
            this.mode = 'immediate';
        }
    }

    ngAfterViewInit(): void {
        if (this.searchInput) {
            this.searchInput.nativeElement.focus();
        }
    }

    public change(isEnter: boolean) {
        if (isEnter || this.mode === 'immediate') {
            this.queryChange.emit(this.query);
            // @todo This is needed to trigger gauges to display.
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 10);
        }
    }

    public clear() {
        this.query = '';
        this.queryChange.emit(this.query);
    }
}
