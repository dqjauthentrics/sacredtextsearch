import {Injectable} from '@angular/core';

declare const postscribe: any;

@Injectable()
export class AdService {
	private readonly adElClass = 'amzn-native-container';
	private creating = false;

	public update(adWords: string) {
		if (!this.creating) {
			this.creating = true;
			try {
				const svc = this;
				window.setTimeout(function() {
					svc.clearOldAds();
					try {
						postscribe('#searchAd', `
                    <script id="searchAdVars" type="text/javascript">
                        amzn_assoc_placement = "adunit0";
                        amzn_assoc_search_bar = "false";
                        amzn_assoc_tracking_id = "sacredtextsea-20";
                        amzn_assoc_ad_mode = "search";
                        amzn_assoc_ad_type = "smart";
                        amzn_assoc_marketplace = "amazon";
                        amzn_assoc_region = "US";
                        amzn_assoc_title = "Support Us by Shopping at Amazon";
                        amzn_assoc_default_search_phrase = "${adWords}";
                        amzn_assoc_default_category = "All";
                        amzn_assoc_linkid = "53309d7bafedbd2f91c18a809fdd6e78";
                    </script>
                    <script id="searchAdScript" src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>`);
					} catch (exception) {
						console.warn(exception);
					}
				}, 100);
			} catch (exception) {
				console.warn(exception);
			}
		}
	}

	private clearOldAds() {
		try {
			this.removeElementsByClass(this.adElClass);
			this.removeScripts();
			this.removeAdDivs();
		} catch (exception) {
			console.warn(exception);
		}
	}

	private removeElementsByClass(className: string) {
		const elements = document.getElementsByClassName(className);
		while (elements.length > 0) {
			const el = elements[0];
			if (el) {
				const parent = el.parentNode;
				if (parent) {
					parent.removeChild(elements[0]);
				}
			}
		}
	}

	private removeScripts() {
		const tags = document.getElementsByTagName('script');
		for (let i = tags.length; i >= 0; i--) {
			const t = tags[i];
			if (t) {
				const id = t.getAttribute('id');
				if (id && ['searchAdScript', 'searchAdVars'].indexOf(id) >= 0) {
					const p = t.parentNode;
					if (p) {
						p.removeChild(t);
					}
				}
			}
		}
	}

	private removeAdDivs() {
		const tags = document.getElementsByTagName('div');
		let ids: Array<any> = [];
		const ts: Array<any> = [];
		for (let i = tags.length; i >= 0; i--) {
			const t = tags[i];
			if (t) {
				const id = t.getAttribute('id');
				if (id && id.indexOf('amzn_assoc_ad_div_adunit0_') >= 0) {
					ids.push(id);
					ts.push(t);
				}
			}
		}
		if (ids.length > 0) {
			ids = ids.sort().reverse();
			ids.shift();
			for (let i = 0; i < ids.length; i++) {
				const p: any = ts[i].parentNode;
				if (p) {
					p.removeChild(ts[i]);
				}
			}
		}
	}
}
