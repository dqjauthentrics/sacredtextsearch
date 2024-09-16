import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ServerConfigService} from './config/server-config.service';
import {CollectionController} from './controllers/collection.controller';
import {AnalyzeController} from './controllers/analyze.controller';
import {EmailController} from './controllers/email.controller';
import {SearchController} from './controllers/search.controller';
import {SysinfoController} from './controllers/sysinfo.controller';

@Module({
	imports: [TypeOrmModule.forRoot(new ServerConfigService().getTypeOrmConfig())],
	controllers: [AppController, AnalyzeController, CollectionController, EmailController, SearchController, SysinfoController],
	providers: [AppService],
})
export class AppModule {}
