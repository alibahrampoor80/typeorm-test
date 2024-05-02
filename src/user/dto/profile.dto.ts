import { IsNumber, IsString } from "class-validator";

export class ProfileDto {
  @IsString()
  bio?: string;
  @IsString()
  photo?: string;
  @IsNumber()
  userId:number
}