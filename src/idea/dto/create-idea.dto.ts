import { IsString, IsInt } from 'class-validator';

export class CreateIdeaDto {
  @IsString({ message: 'name should be string' })
  readonly idea: string;

  @IsString({ message: 'age must be a string value' })
  readonly description: string;
}
