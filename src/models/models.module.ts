import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CoachModule } from './coach/coach.module';
@Module({
  imports: [UserModule, CoachModule, ProductModule],
})
export class ModelsModule {}
