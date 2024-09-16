import {Component} from '@angular/core';
import {EmailService} from '@services/email.service';
import {SearchService} from '@services/search.service';
import {GrowlService} from '@services/growl.service';

@Component({
	selector: 'contact',
	templateUrl: 'contact.component.html',
	styleUrls: ['contact.scss'],
})
export class ContactComponent {
	public name: string | null = null;
	public email: string | null = null;
	public body: string | null = null;
	public sending = false;

	constructor(
		private emailService: EmailService,
		private searchService: SearchService,
		private growlService: GrowlService
	) {
	}

	async closeDialog() {
		// @todo this.searchService.closeConact();
	}

	async presentAlert(error: string | null) {
		if (!error) {
			this.growlService.post({
				title: 'Thank You!',
				body: 'Your message was sent.',
				dismissible: true,
				type: 'success'
			});
		} else {
			const msg = (error === 'invalid' ?
						 'One of the data fields must be empty.' :
						 'The server had a problem sending your message.');
			this.growlService.error(msg);
		}
	}

	public isValid() {
		return this.name && this.name.length > 0 &&
			this.body && this.body.length > 0 &&
			this.email && this.email.length > 4 && this.email.indexOf('@') > 0 && this.email.indexOf('.') > 0;
	}

	public sendEmail() {
		this.sending = true;
		this.emailService.send(this.name, this.email, this.body).then((error: string | null) => {
			this.presentAlert(error).then();
		});
	}
}
