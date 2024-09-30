import {Component, EventEmitter, HostListener, Output} from '@angular/core';

@Component({
	selector: 'closer',
	templateUrl: 'closer.widget.html'
})
export class CloserWidget {
	@Output() closeRequest = new EventEmitter<void>();

	@HostListener('document:keydown.escape', ['$event'])
	onKeydownHandler(_event: KeyboardEvent) {
		this.closeIt();
	}

	public closeIt() {
		this.closeRequest.emit();
	}
}
