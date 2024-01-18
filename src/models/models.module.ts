import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
@Module({
  imports: [UserModule, ProductModule, CartModule]
})
export class ModelsModule {}
