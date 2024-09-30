import {Component, Input} from '@angular/core';
import {VerseInterface} from '@backend/verse.interface';

@Component({
	selector: 'verse-source',
	templateUrl: 'verse-source.component.html',
	styleUrls: ['verse-source.scss'],
})
export class VerseSourceComponent {
	@Input() verse?: VerseInterface;
}
