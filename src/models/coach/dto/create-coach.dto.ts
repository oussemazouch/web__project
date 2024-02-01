import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class CreateCoachDto extends CreateUserDto {
  @IsNotEmpty()
  programPrice: number;
  description: string;
}
