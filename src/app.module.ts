import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Common\commonModule } from './common/common/common/common.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from './config/config.module';
import { ModelsModule } from './models/models.module';

@Module({
  imports: [Common\commonModule, CommonModule, ConfigModule, ModelsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
