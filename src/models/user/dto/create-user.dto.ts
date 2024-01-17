import { IsEmail, IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateUserDto {

    uuid:string;
    @IsNotEmpty()
    name:string;
    @IsNotEmpty()
    lastName:string;
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(100)
    age:number;
    @IsNotEmpty()
    @IsNumber()
    phoneNumber:number;
    @IsEmail()
    @IsNotEmpty()
    email:string;
    address:string;
    @IsNotEmpty()
    password:string;
    @IsNumber()
    @Min(0)
    solde:number;
}
