import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Logger, HttpStatus } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dto/customer-dto';
import { SuccessResponseDto, ErrorResponseDto, successResponse, errorResponse } from 'src/dto/response-dto';
import { customer as PrismaCustomer } from '@prisma/client'; 

@Controller('customers')
export class CustomerController {
  private readonly logger = new Logger(CustomerController.name);

  constructor(private customerService: CustomerService) {}

  @Get()
  async getAll(): Promise<SuccessResponseDto<PrismaCustomer[]> | ErrorResponseDto> { 
    try {
      const customers = await this.customerService.getAll();
      this.logger.log('Customers retrieved successfully',customers);
      return successResponse(customers, 'Customers retrieved successfully');
    } catch (error) {
      this.logger.error('Failed to get customers', error.stack);
      return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto): Promise<SuccessResponseDto<PrismaCustomer> | ErrorResponseDto> { 
    try {
      const customer = await this.customerService.create(createCustomerDto);
      this.logger.log('Created customer successfully',customer);
      return successResponse(customer, 'Customer created successfully');
    } catch (error) {
      this.logger.error('Failed to create customer', error.stack);
      return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCustomerDto: UpdateCustomerDto): Promise<SuccessResponseDto<PrismaCustomer> | ErrorResponseDto> { 
    try {
      const customer = await this.customerService.update(id, updateCustomerDto);
      if (!customer) {
        this.logger.warn(`Customer with id ${id} not found`);
        return errorResponse(HttpStatus.NOT_FOUND, 'Customer not found');
      }
      this.logger.log('Updated customer successfully',customer);
      return successResponse(customer, 'Customer updated successfully');
    } catch (error) {
      this.logger.error('Failed to update customer', error.stack);
      return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<SuccessResponseDto<void> | ErrorResponseDto> {
    try {
      await this.customerService.delete(id);
      this.logger.log(`Customer with id ${id} deleted successfully`);
      return successResponse(null, 'Customer deleted successfully');
    } catch (error) {
      this.logger.error('Failed to delete customer', error.stack);
      return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }
}
