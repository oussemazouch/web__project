import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CoachModule } from './coach/coach.module';
import { OrderModule } from './order/order.module';
@Module({
  imports: [UserModule, CoachModule, ProductModule, OrderModule],
})
export class ModelsModule {}
