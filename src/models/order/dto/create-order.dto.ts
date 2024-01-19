import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    totalAmount: number;

    
    isPaid: boolean;
}
