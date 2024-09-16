import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {GridService} from '../../grid.service';
import {GridButtonSpec, GridItem} from '../../grid.interfaces';
import {Router} from '@angular/router';

@Component({
    selector: 'grid-confirmation-button',
    templateUrl: './grid-confirmation-button.widget.html',
    styleUrls: ['../../grid.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GridConfirmationButtonWidget implements OnInit {
    @Input() item?: GridItem;
    @Input() button?: GridButtonSpec;
    @Output() confirmed: EventEmitter<MouseEvent | KeyboardEvent | PointerEvent> = new EventEmitter<MouseEvent | KeyboardEvent | PointerEvent>();

    public confirmationPrompt = 'Are you sure you wish to remove this record?';
    public confirmationIsOpen = false;

    constructor(private router: Router, public gridService: GridService) {
    }

    public popToggle(event: MouseEvent | KeyboardEvent | PointerEvent) {
        event.stopPropagation();
        this.confirmationIsOpen = !this.confirmationIsOpen;
    }

    public cancel(_event: MouseEvent | KeyboardEvent | PointerEvent) {
        this.confirmationIsOpen = false;
    }

    public confirm(event: MouseEvent | KeyboardEvent | PointerEvent) {
        this.confirmationIsOpen = false;
        this.confirmed.emit(event);
    }

    ngOnInit(): void {
        if (this.button) {
            if (this.button.confirmation && typeof this.button.confirmation === 'string') {
                this.confirmationPrompt = this.button.confirmation;
            }
        }
    }
}
