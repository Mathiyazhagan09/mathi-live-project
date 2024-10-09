import { IsString, IsEnum, IsNotEmpty, IsDate, IsMongoId, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  designation: string;

  @IsEnum(['pending', 'in-progress', 'completed'])
  @IsNotEmpty()
  status: string;

  @IsMongoId()
  @IsNotEmpty()
  assign: string;

  @IsDateString()
  estimateDate:string;

  @IsDateString()
  revisionDate:string;
}
 