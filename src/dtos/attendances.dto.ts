import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCheckDto {
  @IsNumber()
  @IsNotEmpty()
  public employeeId: string;
  @IsString()
  @IsNotEmpty()
  public comment: string;
}
