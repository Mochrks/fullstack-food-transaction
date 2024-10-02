import { IsNotEmpty, IsOptional, IsString, IsInt, Min } from 'class-validator';

export class CreateFoodDto {
  @IsString()
  @IsNotEmpty()
  food_name: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  stock: number;
}

export class UpdateFoodDto {
  @IsOptional()
  @IsString()
  food_name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;
}
