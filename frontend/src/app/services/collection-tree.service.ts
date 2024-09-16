import {Injectable} from '@angular/core';
import {FilterSelectionInterface} from '@shared/interfaces/filter-selection.interface';
import {TomeSelect} from '../pages/search/search.page';
import {TreeviewItem} from '@modules/treeview/models/treeview-item';
import {ReligionInterface} from '@backend/religion.interface';
import {TomeInterface} from '@backend/tome.interface';

export const COLLTREE_TYPE_HEADING = 'H';
export const COLLTREE_TYPE_RELIGION = 'R';
export const COLLTREE_TYPE_TOME = 'T';
export const COLLTREE_TYPE_TRANSLATION = 'TR';

export type CollItemType = 'H' | 'G' | 'R' | 'T' | 'TR';

@Injectable()
export class CollectionTreeService {
	public collectionTreeView: Array<TreeviewItem> = [];

	public getSelectedTranslationIds(): Array<number> {
		return this.traverseGetSelectedTranslationIds(this.collectionTreeView);
	}

	public build(religions: Array<ReligionInterface>, selections: Array<FilterSelectionInterface>): Promise<Array<TreeviewItem>> {
		return new Promise((resolve) => {
			const nodes = this.buildRecursive(religions, selections);
			this.collectionTreeView = nodes;
			resolve(this.collectionTreeView);
		});
	}

	public tomeSelectToggle(tomeSelect: TomeSelect, nodes: Array<TreeviewItem> | null = null, level = 0): void {
		if (!nodes) {
			nodes = this.collectionTreeView;
		}
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i];
			if (node.value.type === COLLTREE_TYPE_TOME) {
				if (tomeSelect.dbTransIds.indexOf(node.value.id) >= 0) {
					node.checked = tomeSelect.selected;
				}
			}
			if (node.children && node.children.length > 0) {
				this.tomeSelectToggle(tomeSelect, node.children, level + 1);
			}
		}
	}

	private buildRecursive(religions: Array<ReligionInterface>, selections: Array<FilterSelectionInterface>): Array<TreeviewItem> {
		const nodes: Array<TreeviewItem> = [];
		for (let i = 0; i < religions.length; i++) {
			const religion = religions[i];
			if (religion.tomes.length > 0 || religion.children.length > 0) {
				const node: TreeviewItem = this.newItem(religion.name, 0, religion.id, COLLTREE_TYPE_RELIGION, selections);
				const tomeNodes = this.buildTomes(religion, selections);
				let children: Array<any> = [];
				if (tomeNodes.length > 0) {
					children = tomeNodes;
				}
				if (religion.children && religion.children.length > 0) {
					children = children.concat(this.buildRecursive(religion.children, selections));
				}
				if (children.length > 0) {
					node.children = children;
				}
				nodes.push(node);
			}
		}
		return nodes;
	}

	private isSelected(id: number, type: CollItemType, selections: Array<FilterSelectionInterface>): boolean {
		for (let i = 0; i < selections.length; i++) {
			switch (type) {
				case COLLTREE_TYPE_RELIGION:
					if (selections[i].religionId === id) {
						return true;
					}
					break;
				case COLLTREE_TYPE_TOME:
					if (selections[i].tomeId === id) {
						return true;
					}
					break;
				case COLLTREE_TYPE_TRANSLATION: {
					const ids = selections[i].translationIds;
					if (ids && ids.indexOf(id) >= 0) {
						return true;
					}
				}
					break;
			}
		}
		return false;
	}

	private newItem(text: string, level: number, id: number, type: CollItemType, selections: Array<FilterSelectionInterface>, children: Array<TreeviewItem> = []): TreeviewItem {
		const checked = this.isSelected(id, type, selections);
		const collapsed = type === COLLTREE_TYPE_HEADING;
		return new TreeviewItem({text: text, value: {level: level, id: id, type: type}, collapsed: collapsed, checked: checked, children: children});
	}

	private buildTomes(religion: ReligionInterface, selections: Array<FilterSelectionInterface>) {
		const tomeNodes: Array<TreeviewItem> = [];
		for (let k = 0; k < religion.tomes.length; k++) {
			const tome = religion.tomes[k];
			if (tome) {
				const transNodes = this.buildTranslations(tome, 3, selections);
				tomeNodes.push(this.newItem(tome.name, 2, tome.id, COLLTREE_TYPE_TOME, selections, transNodes));
			}
		}
		return tomeNodes;
	}

	private buildReligions(religions: Array<ReligionInterface>, selections: Array<FilterSelectionInterface>) {
		const religionNodes: Array<TreeviewItem> = [];
		for (let j = 0; j < religions.length; j++) {
			const religion = religions[j];
			if (religion && (religion.children.length > 0 || religion.tomes.length > 0)) {
				const religionNode = this.newItem(religion.name, 1, religion.id, COLLTREE_TYPE_RELIGION, selections);
				const tomeNodes = this.buildTomes(religion, selections);
				if (tomeNodes.length > 0) {
					religionNode.children = tomeNodes;
				}
				if (religion.children.length > 0) {
					const childNodes = this.buildReligions(religion.children, selections);
					if (childNodes.length > 0) {
						if (!religionNode.children) {
							religionNode.children = [];
						}
						religionNode.children =
							religionNode.children.concat(childNodes);
					}
				}
				religionNodes.push(religionNode);
			}
		}
		return religionNodes;
	}

	private buildTranslations(tome: TomeInterface, level: number, selections: Array<FilterSelectionInterface>) {
		const nodes: Array<TreeviewItem> = [];
		for (let k = 0; k < tome.translations.length; k++) {
			const translation = tome.translations[k];
			if (translation) {
				nodes.push(this.newItem(translation.name, level + 1, translation.id, COLLTREE_TYPE_TRANSLATION, selections));
			}
		}
		const translationNodes = [this.newItem('Translations', level, 0, COLLTREE_TYPE_HEADING, selections, nodes)];
		return translationNodes;
	}

	private traverseGetSelectedTranslationIds(nodes: Array<TreeviewItem>, level = 0): Array<number> {
		let ids: Array<number> = [];
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i];
			// if (level < 3) {
			// 	// console.log('node:' + node.text + (node.checked ? 'Y' : 'N'));
			//     console.log('node', node);
			// }
			if (node.checked || node.checked === undefined) {
				if (node.value.type === COLLTREE_TYPE_TRANSLATION && node.checked) {
					ids.push(node.value.id);
				}
				if (node.children && node.children.length > 0) {
					ids = ids.concat(this.traverseGetSelectedTranslationIds(node.children, level + 1));
				}
			}
		}
		return ids;
	}
}
