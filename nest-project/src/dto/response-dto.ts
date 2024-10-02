import { HttpStatus } from '@nestjs/common';

export class SuccessResponseDto<T> {
  status: string;
  statusCode: number;
  message: string;
  data: T;
}

export class ErrorResponseDto {
  status: string;
  statusCode: number;
  message: string;
}

export function successResponse<T>(
  data: T,
  message: string,
  statusCode: HttpStatus = HttpStatus.OK, 
): SuccessResponseDto<T> {
  return {
    status: 'success',
    statusCode,
    message,
    data,
  };
}

export function errorResponse(statusCode: HttpStatus, message: string): ErrorResponseDto {
  return {
    status: 'error',
    statusCode,
    message,
  };
}
