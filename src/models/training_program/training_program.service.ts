import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { TrainingProgram } from './entities/training_program.entity';
import { CrudService } from '../../common/crud.service';
import { CreateTraining_programDto } from './dto/create-training_program.dto';
import { Exercice } from '../exercice/entities/exercice.entity';
import { UpdateTrainingProgramDto } from './dto/update-training_program.dto';
import { ExerciceService } from '../exercice/exercice.service';

@Injectable()
export class TrainingProgramService {
  constructor(
    @InjectRepository(TrainingProgram)
    private readonly trainingProgramRepository: Repository<TrainingProgram>,
    private exerciceService: ExerciceService,
  ) {}
  async findAll() {
    return await this.trainingProgramRepository.find({
      relations: {
        exercices: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.trainingProgramRepository.find({
      where: { id },
      relations: {
        exercices: true,
      },
    });
  }

  async createTrainingProgram(
    createTraining_programDto: CreateTraining_programDto,
  ) {
    const trainingProgram = this.trainingProgramRepository.create(
      createTraining_programDto,
    );
    trainingProgram.exercices = createTraining_programDto.exercicesIds.map(
      (id) => ({ ...new Exercice(), id }),
    );
    return await this.trainingProgramRepository.save(trainingProgram);
  }

  async addExerciceToTrainingProgram(id: number, Ex_id: number) {
    const existingEntity = await this.trainingProgramRepository.findOne({
      where: { id },
    });

    if (!existingEntity) {
      throw new NotFoundException(`TrainingProgram with id ${id} not found`);
    }

    const exerciceToadd = await this.exerciceService.findExercice(Ex_id);

    console.log(exerciceToadd);
    //
    // existingEntity.exercices.push(exerciceToadd);
    //
    // return this.trainingProgramRepository.save(existingEntity);
  }
  // async getExercicesOfTrainingProgram(id: number) {
  //   const trainingProgram =await this.trainingProgramRepository.findOne({where: { id }} );
  //   trainingProgram.exercices = trainingProgram.exercicesIds.map(
  //       (id) => ({ ...new Exercice(), id }),
  //   );
  //   return await this.trainingProgramRepository.save(trainingProgram);
  // }

  // async Add_ExercicesToTrainingProgram(
  //   TrainingProgramId: number,
  //   ExercicesId: number[],
  // ): Promise<TrainingProgram> {
  //   const trainingProgram = await this.trainingProgramRepository.findOne({
  //     where: { id: TrainingProgramId },
  //   });
  //
  //   if (!trainingProgram) {
  //     throw new Error('trainingProgram not found');
  //   }
  //
  //   const exercices = await this.exerciceService.findByIds(ExercicesId); // Fetch courses by IDs
  //
  //   if (!exercices.length) {
  //     throw new Error('No exercices found with the provided IDs');
  //   }
  //
  //   trainingProgram.exercices = exercices; // Assign fetched courses to the student
  //
  //   return this.trainingProgramRepository.save(trainingProgram); // Save the updated student
  // }
}
