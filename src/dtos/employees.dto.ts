import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  public lastName: string;
  @IsString()
  @IsNotEmpty()
  public firstName: string;
  @IsString()
  @IsNotEmpty()
  public department: string;
}
