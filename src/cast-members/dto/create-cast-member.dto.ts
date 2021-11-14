import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateCastMemberDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  type: number;
}