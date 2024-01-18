import { IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductDto } from '../../product/dto/create-product.dto';
import { CreateUserDto } from '../../user/dto/create-user.dto';

export class CreateCartDto {
  @IsNumber()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductDto)
  products: CreateProductDto[]; // Use the DTO for product creation, not the entity
}
