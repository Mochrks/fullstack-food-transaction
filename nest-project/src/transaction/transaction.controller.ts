import { Controller, Get, Post, Put, Delete, Param, Body, Logger, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, UpdateTransactionDto } from 'src/dto/transaction-dto';
import { SuccessResponseDto, ErrorResponseDto, successResponse, errorResponse } from 'src/dto/response-dto';
import { transactions as PrismaTransaction } from '@prisma/client';

@Controller('transactions')
export class TransactionController {
  private readonly logger = new Logger(TransactionController.name);

  constructor(private transactionService: TransactionService) {}

  @Get()
  async getAll(): Promise<SuccessResponseDto<PrismaTransaction[]> | ErrorResponseDto> {
    try {
      const transactions = await this.transactionService.getAll();
      this.logger.log('Transactions retrieved successfully', transactions);
      return successResponse(transactions, 'Transactions retrieved successfully');
    } catch (error) {
      this.logger.error('Failed to get transactions', error.stack);
      return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto): Promise<SuccessResponseDto<PrismaTransaction> | ErrorResponseDto> {
    try {
      const transaction = await this.transactionService.create(createTransactionDto);
      this.logger.log('Created transaction successfully', transaction);
      return successResponse(transaction, 'Transaction created successfully');
    } catch (error) {
      this.logger.error('Failed to create transaction', error.stack);
      return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTransactionDto: UpdateTransactionDto): Promise<SuccessResponseDto<PrismaTransaction> | ErrorResponseDto> {
    try {
      const transaction = await this.transactionService.update(id, updateTransactionDto);
      if (!transaction) {
        this.logger.warn(`Transaction with id ${id} not found`);
        return errorResponse(HttpStatus.NOT_FOUND, 'Transaction not found');
      }
      this.logger.log('Updated transaction successfully', transaction);
      return successResponse(transaction, 'Transaction updated successfully');
    } catch (error) {
      this.logger.error('Failed to update transaction', error.stack);
      return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<SuccessResponseDto<void> | ErrorResponseDto> {
    try {
      await this.transactionService.delete(id);
      this.logger.log(`Transaction with id ${id} deleted successfully`);
      return successResponse(null, 'Transaction deleted successfully');
    } catch (error) {
      this.logger.error('Failed to delete transaction', error.stack);
      return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }
}
