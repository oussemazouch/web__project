import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ProductType } from '../entities/product.entity';

export class UpdateProductDto extends PartialType(CreateProductDto) {
        @IsString()
        name?: string;
      
        @IsString()
        description?: string;
      
        @IsString()
        photo?: string;
      
        @IsNumber()
        price?: number;
      
        @IsEnum(ProductType)
        productType?: ProductType;
      
}
