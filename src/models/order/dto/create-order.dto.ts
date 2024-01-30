import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, IsPositive, ValidateNested } from "class-validator";
import { CreateProductDto } from "src/models/product/dto/create-product.dto";



export class CreateOrderDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    totalAmount: number;

    
    isPaid: boolean;
    @IsArray()
    @ArrayNotEmpty()
    products?: number[];
}
