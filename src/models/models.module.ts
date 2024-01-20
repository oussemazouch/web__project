import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CoachModule } from './coach/coach.module';
import { OrderModule } from './order/order.module';
import { TrainingProgramModule } from './training_program/training_program.module';
import { ExerciceModule } from './exercice/exercice.module';
@Module({
  imports: [UserModule, CoachModule, ProductModule, OrderModule, TrainingProgramModule, ExerciceModule],
})
export class ModelsModule {}
