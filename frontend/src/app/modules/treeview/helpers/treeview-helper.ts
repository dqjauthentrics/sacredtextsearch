import {TreeviewItem} from '../models/treeview-item';

export const TreeviewHelper = {
	findItem,
	findItemInList,
	findParent,
	removeItem,
	concatSelection
};

function findItem(root: TreeviewItem, value: any): TreeviewItem | undefined {
	if (!root) {
		return undefined;
	}
	if (root.value === value) {
		return root;
	}
	if (root.children) {
		for (const child of root.children) {
			const foundItem = findItem(child, value);
			if (foundItem) {
				return foundItem;
			}
		}
	}
	return undefined;
}

function findItemInList(list: TreeviewItem[], value: any): TreeviewItem | undefined {
	if (!list) {
		return undefined;
	}
	for (const item of list) {
		const foundItem = findItem(item, value);
		if (foundItem) {
			return foundItem;
		}
	}
	return undefined;
}

function findParent(root: TreeviewItem, item: TreeviewItem): TreeviewItem | undefined {
	if (!root || !root.children) {
		return undefined;
	}
	for (const child of root.children) {
		if (child === item) {
			return root;
		} else {
			const parent = findParent(child, item);
			if (parent) {
				return parent;
			}
		}
	}
	return undefined;
}

function removeItem(root: TreeviewItem, item: TreeviewItem): boolean {
	const parent = findParent(root, item);
	if (parent && parent.children) {
		for (let i = 0; i < parent.children.length; i++) {
			if (parent.children[i] == item) {
				parent.children.splice(i, 1);
			}
		}
		if (!parent.children?.length) {
			parent.children = undefined;
		} else {
			parent.correctChecked();
		}
		return true;
	}
	return false;
}

function concatSelection(items: TreeviewItem[], checked: TreeviewItem[], unchecked: TreeviewItem[]): { [k: string]: TreeviewItem[] } {
	let checkedItems = [...checked];
	let uncheckedItems = [...unchecked];
	for (const item of items) {
		const selection = item.getSelection();
		checkedItems = checkedItems.concat(selection.checkedItems);
		uncheckedItems = uncheckedItems.concat(selection.uncheckedItems);
	}
	return {checked: checkedItems, unchecked: uncheckedItems};
}
