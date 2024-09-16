import {TreeviewHelper} from '../helpers/treeview-helper';

export interface TreeviewSelection {
	checkedItems: TreeviewItem[];
	uncheckedItems: TreeviewItem[];
}

export interface TreeItem {
	text: string;
	value: any;
	disabled?: boolean;
	checked?: boolean;
	collapsed?: boolean;
	children?: TreeItem[];
}

export class TreeviewItem {
	text: string;
	value: any;
	private internalDisabled = false;
	private internalChecked = true;
	private internalCollapsed = false;
	private internalChildren: TreeviewItem[] | undefined;

	constructor(item: TreeItem, autoCorrectChecked = false) {
		if (!item) {
			throw new Error('Item must be defined');
		}
		this.text = item.text || '';
		this.value = item.value;
		this.checked = !!item.checked;
		this.collapsed = !!item.collapsed;
		this.disabled = !!item.disabled;
		if (item.children && item.children.length > 0) {
			this.children = item.children.map(child => {
				child.disabled = this.disabled;
				return new TreeviewItem(child);
			});
		}
		if (autoCorrectChecked) {
			this.correctChecked();
		}
	}

	get checked(): boolean {
		return this.internalChecked;
	}

	set checked(value: boolean) {
		if (!this.internalDisabled) {
			if (this.internalChecked !== value) {
				this.internalChecked = value;
			}
		}
	}

	get indeterminate(): boolean {
		return this.checked === undefined;
	}

	get disabled(): boolean {
		return this.internalDisabled;
	}

	set disabled(value: boolean) {
		if (this.internalDisabled !== value) {
			this.internalDisabled = value;
			if (this.internalChildren) {
				this.internalChildren
					.forEach(child => child.disabled = value);
			}
		}
	}

	get collapsed(): boolean {
		return this.internalCollapsed;
	}

	set collapsed(value: boolean) {
		if (this.internalCollapsed !== value) {
			this.internalCollapsed = value;
		}
	}

	get children(): TreeviewItem[] | undefined {
		return this.internalChildren;
	}

	set children(value: TreeviewItem[] | undefined) {
		if (this.internalChildren !== value) {
			if (value && value.length === 0) {
				throw new Error('Children must be not an empty array');
			}
			this.internalChildren = value;
			if (this.internalChildren) {
				let checked: boolean | undefined | null = null;
				this.internalChildren.forEach(child => {
					if (checked === null) {
						checked = child.checked;
					} else {
						if (child.checked !== checked) {
							checked = undefined;
							return;
						}
					}
				});
				this.internalChecked = !!checked;
			}
		}
	}

	setCheckedRecursive(value: boolean): void {
		if (!this.internalDisabled) {
			this.internalChecked = value;
			if (this.internalChildren) {
				this.internalChildren
					.forEach(child => child.setCheckedRecursive(value));
			}
		}
	}

	setCollapsedRecursive(value: boolean): void {
		this.internalCollapsed = value;
		if (this.internalChildren) {
			this.internalChildren
				.forEach(child => child.setCollapsedRecursive(value));
		}
	}

	getSelection(): TreeviewSelection {
		let checkedItems: TreeviewItem[] = [];
		let uncheckedItems: TreeviewItem[] = [];
		if (!this.internalChildren) {
			if (this.internalChecked) {
				checkedItems.push(this);
			} else {
				uncheckedItems.push(this);
			}
		} else {
			const selection = TreeviewHelper.concatSelection(this.internalChildren, checkedItems, uncheckedItems);
			checkedItems = selection.checked;
			uncheckedItems = selection.unchecked;
		}

		return {
			checkedItems,
			uncheckedItems
		};
	}

	correctChecked(): void {
		this.internalChecked = this.getCorrectChecked();
	}

	private getCorrectChecked(): boolean {
		let checked: boolean | null | undefined = null;
		if (this.internalChildren) {
			for (const child of this.internalChildren) {
				child.internalChecked = child.getCorrectChecked();
				if (checked === null) {
					checked = child.internalChecked;
				} else if (checked !== child.internalChecked) {
					checked = undefined;
					break;
				}
			}
		} else {
			checked = this.checked;
		}
		return !!checked;
	}
}
