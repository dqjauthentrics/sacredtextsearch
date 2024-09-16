import {Get, JsonController, OnUndefined} from 'routing-controllers';
import {getConnection, Repository} from 'typeorm';
import {DataResult} from '../entities/DataResult';
import {Sysinfo} from '../entities/Sysinfo';

@JsonController('/sysinfo')
export class SysinfoController {
	private repo: Repository<Sysinfo>;

	constructor() {
		this.repo = getConnection().getRepository(Sysinfo);
	}

	@Get('/get')
	@OnUndefined(404)
	get() {
		return this
			.repo.findOne({})
			.then((rec: any) => {
				// console.log(rec);
				return new DataResult<Sysinfo>(1, 0, 1, rec);
			})
			.catch((e) => {
				process.stderr.write(`${e}\n`);
			});
	}
}
