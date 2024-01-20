import { Test, TestingModule } from '@nestjs/testing';
import { TrainingProgramController } from './training_program.controller';
import { TrainingProgramService } from './training_program.service';

describe('TrainingProgramController', () => {
  let controller: TrainingProgramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingProgramController],
      providers: [TrainingProgramService],
    }).compile();

    controller = module.get<TrainingProgramController>(TrainingProgramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
