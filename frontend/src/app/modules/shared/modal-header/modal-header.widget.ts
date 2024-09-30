import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
	selector: 'modal-header',
	templateUrl: 'modal-header.widget.html',
	styleUrls: ['modal-header.scss']
})
export class ModalHeaderWidget {
	@Input() title = '';
	@Input() subTitle = '';
	@Input() subSubTitle = '';
	@Input() tomeData: any;
	@Output() closeRequest = new EventEmitter<void>();

	public hideDialog() {
		this.closeRequest.emit();
	}
}
