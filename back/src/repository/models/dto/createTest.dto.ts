import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTestDto {
  @IsString()
  repoId: string;

  @IsString()
  name: string;

  @IsArray()
  questions: any[];
}
