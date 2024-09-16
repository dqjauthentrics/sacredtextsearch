import {Component, Input, OnInit} from '@angular/core';
import {GridService} from '../../grid.service';
import {GridColSpec, GridConfig, GridItem} from '../../grid.interfaces';
import {GridLinkService} from '../../grid-link.service';

@Component({
    selector: 'grid-column',
    templateUrl: './grid-column.widget.html',
})
export class GridColumnWidget implements OnInit {
    @Input() item?: GridItem;
    @Input() config?: GridConfig;
    @Input() colSpec: GridColSpec | undefined;

    public routerHref: string | null = null;
    public externalHref: string | null = null;

    constructor(private gridService: GridService, private gridLinkService: GridLinkService) {
    }

    ngOnInit(): void {
        if (this.colSpec && this.colSpec.typeSpec) {
            if (this.colSpec.typeSpec.linkSpec && this.item) {
                const href = this.gridLinkService.parse(this.item, this.colSpec.typeSpec.linkSpec.path);
                if (this.colSpec.typeSpec.linkSpec.linkType !== 'external') {
                    this.routerHref = href;
                } else {
                    this.externalHref = href;
                }
            }
        }
    }

    public clickHandler(item: GridItem, colSpec: GridColSpec, event: MouseEvent | KeyboardEvent) {
        event.stopPropagation();
        if (colSpec.typeSpec && colSpec.typeSpec.linkSpec && colSpec.typeSpec.linkSpec.click) {
            colSpec.typeSpec.linkSpec.click(item);
        }
    }
}
