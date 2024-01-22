import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TrainingProgramService } from './training_program.service';
import { CreateTraining_programDto } from './dto/create-training_program.dto';
import { UpdateTrainingProgramDto } from './dto/update-training_program.dto';

@Controller('training-program')
export class TrainingProgramController {
  constructor(
    private readonly trainingProgramService: TrainingProgramService,
  ) {}

  // @Post(':id/exercices')
  // async addExercicesToTrainingProgram(
  //   @Param('id') id: string,
  //   @Body() body: { exercicesIds: number[] },
  // ): Promise<any> {
  //   const TrainingProgramId = +id;
  //   const exercicesIds = body.exercicesIds;
  //
  //   try {
  //     const updatedTrainingProgram =
  //       await this.trainingProgramService.Add_ExercicesToTrainingProgram(
  //         TrainingProgramId,
  //         exercicesIds,
  //       );
  //     return {
  //       message: 'Exercices added to Training Program successfully',
  //       data: updatedTrainingProgram,
  //     };
  //   } catch (error) {
  //     if (error.status === HttpStatus.NOT_FOUND) {
  //       throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
  //     }
  //     throw new HttpException(
  //       'Error adding exercices to ',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  @Post()
  create(@Body() createTraining_programDto: CreateTraining_programDto) {
    return this.trainingProgramService.createTrainingProgram(
      createTraining_programDto,
    );
  }

  @Get()
  findAll() {
    return this.trainingProgramService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingProgramService.findOne(+id);
  }

  // @Patch('addExercice/:id')
  // update(
  //   @Param('id') id: string,
  //   @Body() exerciceId: number,
  // ) {
  //   return this.trainingProgramService.addExerciceToTrainingProgram(
  //     +id,
  //     +exerciceId,
  //   );
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.trainingProgramService.remove(+id);
  // }
}
