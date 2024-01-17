import { Module } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachController } from './coach.controller';
import { Coach } from './entities/coach.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CoachController],
  providers: [CoachService],
  imports: [TypeOrmModule.forFeature([Coach])],
  exports:[CoachService],
})
export class CoachModule {}
