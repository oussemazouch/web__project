import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { ModelsModule } from './models/models.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user/entities/user.entity';
import { Product } from './models/product/entities/product.entity';
import { Coach } from './models/coach/entities/coach.entity';
import { Order } from './models/order/entities/order.entity';
import {Exercice} from "./models/exercice/entities/exercice.entity";
import {TrainingProgram} from "./models/training_program/entities/training_program.entity";

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Product, Coach,Order,Exercice,TrainingProgram],
      synchronize: true,
      logging: true,
    }),
    ModelsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
