import {Injectable} from '@angular/core';
import {FilterSelectionInterface} from '@shared/interfaces/filter-selection.interface';
import {ReligionInterface} from '@backend/religion.interface';
import {TomeInterface} from '@backend/tome.interface';

@Injectable()
export class FilterSelectionService {
	public readonly STORAGE_NAME = 'filters';
	public selections: Array<FilterSelectionInterface> = [];

	public initialize(collection: ReligionInterface[]): Promise<Array<FilterSelectionInterface>> {
		return this.retrieve(collection);
	}

	private addDefaultTranslations(tome: TomeInterface): Array<number> {
		const translationIds: Array<number> = [];
		if (tome.translations) {
			for (let z = 0; z < tome.translations.length; z++) {
				const translation = tome.translations[z];
				if (translation.isDefault) {
					translationIds.push(translation.id);
				}
			}
		}
		return translationIds;
	}

	private setDefaults(religions: Array<ReligionInterface>): Array<FilterSelectionInterface> {
		for (let i = 0; i < religions.length; i++) {
			const religion = religions[i];
			for (let j = 0; j < religion.tomes.length; j++) {
				const tome = religion.tomes[j];
				const translationIds = this.addDefaultTranslations(tome);
				if (translationIds.length > 0) {
					this.selections.push({religionId: religion.id, tomeId: tome.id, translationIds: translationIds})
				}
			}
			for (let k = 0; k < religion.children.length; k++) {
				this.setDefaults(religion.children);
			}
		}
		return this.selections;
	}

	private store(): void {
		localStorage.setItem(this.STORAGE_NAME, JSON.stringify(this.selections));
	}

	private retrieve(collection: Array<ReligionInterface>): Promise<Array<FilterSelectionInterface>> {
		return new Promise((resolve) => {
			const stored = localStorage.getItem(this.STORAGE_NAME);
			try {
				if (stored && stored.length > 0) {
					const tmp = JSON.parse(stored);
					this.selections = tmp;
				}
			} catch (exception) {
			}
			if (this.selections && this.selections.length > 0) {
				resolve(this.selections);
			} else {
				resolve(this.setDefaults(collection));
			}
		});
	}
}
