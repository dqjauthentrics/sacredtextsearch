import {NgModule} from '@angular/core';
import {AdLinksWidget} from './ad-links.widget';
import {CommonModule} from '@angular/common';
import {AdLinksService} from './ad-links.service';

@NgModule(
	{
		declarations: [AdLinksWidget],
		exports: [AdLinksWidget],
		imports: [CommonModule],
		providers: [AdLinksService]
	})
export class AdLinksModule {
}
