import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {Exercice} from "../../exercice/entities/exercice.entity";

export class CreateTraining_programDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'name is too short ' })
  @MaxLength(20)
  description: string;

  @IsNotEmpty()
  exercicesIds: number[];
}
