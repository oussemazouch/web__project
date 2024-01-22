import { Module } from '@nestjs/common';
import { ExerciceService } from './exercice.service';
import { ExerciceController } from './exercice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercice } from './entities/exercice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercice])],
  controllers: [ExerciceController],
  providers: [ExerciceService],
  exports:[ExerciceService]
})
export class ExerciceModule {}
