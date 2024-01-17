import { IsNotEmpty } from '@nestjs/class-validator';

export class CreateCoachDto {
  @IsNotEmpty()
  ProgramPrice: number;

  @IsNotEmpty()
  description: string;
}
