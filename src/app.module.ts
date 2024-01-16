import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CommonModule } from './common/common.module';
import { ConfigModule } from './config/config.module';
import { ModelsModule } from './models/models.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user/entities/user.entity';

@Module({
  imports: [CommonModule, 
    ConfigModule,
     ModelsModule,
     TypeOrmModule.forRoot({
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "",
			database: "gymDB",
			entities: [User],
			synchronize: true,
			logging: true,
		}),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
