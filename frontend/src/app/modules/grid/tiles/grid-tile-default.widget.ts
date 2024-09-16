import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GridService} from '../grid.service';
import {GridConfig, GridItem, GridTileSpec} from '../grid.interfaces';
import {GridLinkService} from '../grid-link.service';

@Component({
    selector: 'grid-tile-default',
    templateUrl: './grid-tile-default.widget.html',
    styleUrls: ['../grid.scss']
})
export class GridTileDefaultWidget implements OnInit {
    @Input() item?: GridItem;
    @Input() config?: GridConfig;
    @Output() itemSelectToggle: EventEmitter<GridItem> = new EventEmitter<GridItem>();

    public spec: GridTileSpec | undefined = undefined;
    public image: string | null | undefined;
    public title: string | null | undefined;

    constructor(private gridService: GridService, private gridLinkService: GridLinkService) {
    }

    ngOnInit(): void {
        this.spec = this.config?.tileSpec;
        if (this.spec && this.item) {
            this.image = (this.spec.imageCallback ? this.spec.imageCallback(this.item) :
                          this.spec.imageColumn ? this.item?.record[this.spec.imageColumn] : '');

            if (!this.image || this.image.length === 0 && this.spec.fallbackImage) {
                this.image = this.spec.fallbackImage;
            }

            this.title = (this.spec.titleCallback ? this.spec.titleCallback(this.item) :
                          this.spec.titleColumn ? this.item.record[this.spec.titleColumn] : '');
        }
    }

    public itemClick(item: GridItem) {
        if (this.config && this.config.itemClick) {
            const itemSelectChange = this.gridLinkService.handleItemClick(this.config, item, this.config.itemClick);
            if (itemSelectChange) {
                this.itemSelectToggle.emit(item);
            }
        }
    }
}
