import {Injectable} from '@angular/core';
import {AppearanceAnimation, TextAlignEnum, ToastifyRemoteControl, ToastPosition, ToastTypeEnum,} from '@ng-vibe/toastify';

export type GrowlMessageTypes = 'error' | 'info' | 'warning' | 'success';
export type GrowlPositions = 'top' | 'bottom';

export interface GrowlMessage {
	type: GrowlMessageTypes;
	title: string;
	body: string;
	seconds?: number;
	dismissible?: boolean;
	position?: GrowlPositions;
	_id?: string;
}

@Injectable()
export class GrowlService {
	public readonly TIMEOUT_DEFAULT_MILLISECONDS = 10000;
	public messages: Array<GrowlMessage> = [];
	private toast = new ToastifyRemoteControl();

	public post(message: GrowlMessage): void {
		this.toast.options = {
			text: message.body,
			title: message.title || '',
			autoCloseDuration: ((message.seconds || 0) * 1000) || this.TIMEOUT_DEFAULT_MILLISECONDS,
			layoutType: this.typeToLayout(message.type),
			position: ToastPosition.BOTTOM_LEFT,
			textAlign: TextAlignEnum.START,
			animationIn: AppearanceAnimation.BOUNCE_IN,
		};
		this.toast.openToast();
	}

	public clearMessages(justInfoMessages = false) {
		// @todo This is probably not the best way to remove toast messages when changing pages.  Have filed
		//       a request for a better solution: https://github.com/costlydeveloper/ngx-awesome-popup/issues/42
		//       -dqj 12/15/22
		const msgBoxes = document.querySelectorAll('.toast-wrapper');
		for (let i = 0; i < msgBoxes.length; i++) {
			if (!justInfoMessages || (justInfoMessages && this.hasChild(msgBoxes[i], 'info-dialog'))) {
				msgBoxes[i].remove();
			}
		}
	}

	public error(body: string): void {
		this.post({title: this.typeToTitle('error'), body: body, dismissible: true, type: 'error'});
	}

	public info(body: string): void {
		this.post({title: this.typeToTitle('info'), body: body, dismissible: true, type: 'info'});
	}

	public warning(body: string): void {
		this.post({title: this.typeToTitle('warning'), body: body, dismissible: true, type: 'warning'});
	}

	public success(body: string): void {
		this.post({title: this.typeToTitle('success'), body: body, dismissible: true, type: 'success'});
	}

	public typeToTitle(type: GrowlMessageTypes) {
		switch (type) {
			case 'error':
				return 'Error!';
			case 'warning':
				return 'Warning!';
			case 'info':
				return 'FYI';
			case 'success':
				return 'Success!';
		}
	}

	private hasChild(el: Element, className: string) {
		if (el && el.children) {
			for (let i = 0; i < el.children.length; i++) {
				if (el.children[i].classList.contains(className)) {
					return true;
				}
			}
		}
		return false;
	}

	private typeToLayout(type: GrowlMessageTypes) {
		switch (type) {
			case 'error':
				return ToastTypeEnum.DANGER;
			case 'warning':
				return ToastTypeEnum.WARNING;
			case 'info':
				return ToastTypeEnum.INFO;
			case 'success':
				return ToastTypeEnum.SUCCESS;
		}
	}
}
