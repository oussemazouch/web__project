import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports:[TypeOrmModule.forFeature([Order]),UserModule]
})
export class OrderModule {}
