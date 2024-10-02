import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsInt()
  @IsNotEmpty()
  customer_id: number;

  @IsInt()
  @IsNotEmpty()
  food_id: number;

  @IsInt()
  @IsNotEmpty()
  qty: number;
}

export class UpdateTransactionDto {
  @IsOptional()
  @IsInt()
  qty?: number; 
}
