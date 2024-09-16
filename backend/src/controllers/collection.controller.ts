import { Tome } from '../entities/tome';
import { Religion } from '../entities/religion';
import { Controller, Get } from '@nestjs/common';
import { DataSource, FindManyOptions, FindOptionsWhere, IsNull } from 'typeorm';
import * as process from 'process';
import {DataResult} from '../shared/interfaces/data-result';

@Controller('/collection')
export class CollectionController {
  private readonly dataSource: DataSource;

  constructor() {
    this.dataSource = global.ServerConfig.dataSource;
  }

  @Get('/list')
  list() {
    const tomeRepo = this.dataSource.getRepository<Tome>(Tome);
    return tomeRepo.count().then((totalCount: any) => {
      const options: FindManyOptions<Tome> = {
        order: { sortOrder: 'ASC' },
        relations: ['translations', 'children'],
      };
      return tomeRepo
        .find(options)
        .then((tomes: Array<Tome>) => {
          return new DataResult<Tome>(totalCount, 0, totalCount, tomes);
        })
        .catch((e) => {
          process.stderr.write(`${e}\n`);
        });
    });
  }

  @Get('/tree')
  tree() {
    return this.getReligions(null).then((religions: Array<Religion>) => {
      const totalCount = religions.length;
      return new DataResult<Religion>(totalCount, 0, totalCount, religions);
    });
  }

  private async getReligions(parentId: number | null) {
    const religionRepo = this.dataSource.getRepository<Religion>(Religion);
    let religions: Array<Religion> = [];
    let condition: FindOptionsWhere<Religion> = { parentId: IsNull() };
    if (parentId) {
      condition = { parentId };
    }
    await religionRepo
      .find({
        order: { sortOrder: 'ASC' },
        where: condition,
        relations: ['tomes', 'tomes.translations'],
      })
      .then((rels: Array<Religion>) => {
        religions = rels;
      });
    for (let i = 0; i < religions.length; i++) {
      religions[i].children = await this.getReligions(religions[i].id);
    }
    return religions;
  }
}
