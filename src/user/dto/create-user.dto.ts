import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({message:"فیلد firstName نمیتواد خالی باشد"})
  firstName: string;
  @IsString()
  @IsNotEmpty({message:"فیلد lastName نمیتواد خالی باشد"})
  lastName: string;
  @IsNumber()
  @IsNotEmpty({message:"فیلد age نمیتواد خالی باشد"})
  age: number;
  @IsEmail()
  @IsNotEmpty({message:"فیلد email نمیتواد خالی باشد"})
  email: string;
}
