import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
	selector: 'ad-block-check',
	templateUrl: './ad-block-check.component.html',
	styleUrls: ['./ad-block-check.scss']
})
export class AdBlockCheckComponent implements OnInit {
	@Input() adBlockId = 'adBlockCheck';
	@Output() canShowAds: EventEmitter<boolean> = new EventEmitter<boolean>();

	private readonly testURL = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

	ngOnInit(): void {
		this.checkAdsBlocked((blocked: any) => {
			if (blocked) {
				this.canShowAds.emit(false);
				this.setEl('0');
			} else {
				this.canShowAds.emit(true);
				this.setEl('1');
			}
		});
	}

	private checkAdsBlocked(callback: (blocked: boolean) => void): void {
		try {
			fetch(new Request(this.testURL, {method: 'HEAD', mode: 'no-cors'})).then(function(response) {
				return response;
			}).then(() => {
				callback(false);
			}).catch(() => {
				callback(true);
			});
		} catch (exception) {
			console.warn('ads blocked', exception);
		}
	}

	private setEl(val: string) {
		const el = document.getElementById(this.adBlockId);
		if (el) {
			el.innerHTML = val;
		}
	}
}
