import { PartialType } from '@nestjs/mapped-types';
import {CreateTraining_programDto, } from './create-training_program.dto';

export class UpdateTrainingProgramDto extends PartialType(CreateTraining_programDto) {}
