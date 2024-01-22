import { Module } from '@nestjs/common';
import { TrainingProgramService } from './training_program.service';
import { TrainingProgramController } from './training_program.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingProgram } from './entities/training_program.entity';
import { ExerciceModule } from '../exercice/exercice.module';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingProgram]), ExerciceModule],
  controllers: [TrainingProgramController],
  providers: [TrainingProgramService],
})
export class TrainingProgramModule {}
