import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
