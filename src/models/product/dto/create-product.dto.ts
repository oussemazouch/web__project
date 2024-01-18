// product.dto.ts

import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { ProductType } from '../entities/product.entity';
import { baseEntity } from 'src/common/base.entity';

export class CreateProductDto extends baseEntity {
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: "Le nom doit avoir au moins 6 caractères" })
  @MaxLength(25)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;

  @IsNotEmpty()
  @IsString()
  photo: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsEnum(ProductType)
  productType: ProductType;
}

