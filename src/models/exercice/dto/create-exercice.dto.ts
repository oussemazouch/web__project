import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateExerciceDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'name is too short ' })
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  sets: number;

  @IsNotEmpty()
  @IsNumber()
  reps: number;
}
