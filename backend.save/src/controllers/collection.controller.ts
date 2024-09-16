import {Get, JsonController, OnUndefined} from 'routing-controllers';
import {getConnection, IsNull, Repository} from 'typeorm';
import {Tome} from '../entities/Tome';
import {DataResult} from '../entities/DataResult';
import {Religion} from '../entities/Religion';

@JsonController('/collection')
export class CollectionController {
	private tomeRepo: Repository<Tome>;
	private religionRepo: Repository<Religion>;

	constructor() {
		this.tomeRepo = getConnection().getRepository(Tome);
		this.religionRepo = getConnection().getRepository(Religion);
	}

	@Get('/list')
	@OnUndefined(404)
	list() {
		return this.tomeRepo.count().then((totalCount: any) => {
			return this
				.tomeRepo
				.find({
					order: {sort_order: 'ASC'},
					// where: {parent_id: IsNull()},
					relations: ['translations', 'children']
				})
				.then((tomes: Array<Tome>) => {
					return new DataResult<Tome>(totalCount, 0, totalCount, tomes);
				})
				.catch((e) => {
					process.stderr.write(`${e}\n`);
				});
		});
	}

	@Get('/tree')
	@OnUndefined(404)
	tree() {
		return this.getReligions(null).then((religions: Array<Religion>) => {
			const totalCount = religions.length;
			return new DataResult<Religion>(totalCount, 0, totalCount, religions);
		});
	}

	private async getReligions(parentId: number | null) {
		let religions: Array<Religion> = [];
		let condition: any = {parentId: IsNull()};
		if (parentId) {
			condition = {parent_id: parentId};
		}
		await this.religionRepo.find({
			order: {sort_order: 'ASC'},
			where: condition,
			relations: ['tomes', 'tomes.translations']
		}).then((rels: Array<Religion>) => {
			religions = rels;
		});
		for (let i = 0; i < religions.length; i++) {
			religions[i].children = await this.getReligions(religions[i].id);
		}
		// console.log('getReligions:', religions);
		return religions;
	}
}
