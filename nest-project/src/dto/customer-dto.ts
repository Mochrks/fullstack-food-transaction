import { IsOptional, IsString, IsNotEmpty, Matches  } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @Matches(/^[0-9]+$/, { message: 'phone must contain only numbers' })
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;
}

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @Matches(/^[0-9]+$/, { message: 'phone must contain only numbers' })
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
