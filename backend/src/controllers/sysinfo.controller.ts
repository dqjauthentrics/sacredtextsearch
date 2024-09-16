import { DataSource, Repository } from 'typeorm';
import { Sysinfo } from '../entities/sysinfo';
import { Controller, Get } from '@nestjs/common';
import { DataResult } from '../shared/interfaces/data-result';

@Controller('/sysinfo')
export class SysinfoController {
  private repo: Repository<Sysinfo>;
  private readonly dataSource: DataSource;

  constructor() {
    this.dataSource = global.ServerConfig.dataSource;
    this.repo = this.dataSource.getRepository(Sysinfo);
  }

  @Get('/get')
  get() {
    return this.repo
      .findOne({ where: { id: 1 } })
      .then((rec: any) => {
        return new DataResult<Sysinfo>(1, 0, 1, rec);
      })
      .catch((e) => {
        process.stderr.write(`${e}\n`);
      });
  }
}
