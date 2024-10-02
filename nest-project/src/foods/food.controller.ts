import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe, Logger, HttpStatus } from '@nestjs/common';
import { FoodService } from './food.service';
import { CreateFoodDto, UpdateFoodDto } from 'src/dto/food-dto';
import { SuccessResponseDto, ErrorResponseDto, successResponse, errorResponse } from 'src/dto/response-dto';
import { foods as PrismaFoods } from '@prisma/client'; 

@Controller('foods')
export class FoodController {
  private readonly logger = new Logger(FoodController.name);

  constructor(private foodService: FoodService) {}

  @Get()
  async getAll(): Promise<SuccessResponseDto<PrismaFoods[]> | ErrorResponseDto> {
    try {
      const foods = await this.foodService.getAll();
      this.logger.log('Foods retrieved successfully', foods);
      return successResponse(foods, 'Foods retrieved successfully');
    } catch (error) {
      this.logger.error('Failed to get foods', error.stack);
      return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }
 
  @Post()
  async create(@Body() createFoodDto: CreateFoodDto): Promise<SuccessResponseDto<PrismaFoods> | ErrorResponseDto> {
    try {
      const food = await this.foodService.create(createFoodDto);
      this.logger.log('Created food successfully', food);
      return successResponse(food, 'Food created successfully');
    } catch (error) {
      this.logger.error('Failed to create food', error.stack);
      return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateFoodDto: UpdateFoodDto): Promise<SuccessResponseDto<PrismaFoods> | ErrorResponseDto> {
    try {
      const food = await this.foodService.update(id, updateFoodDto);
      if (!food) {
        this.logger.warn(`Food with id ${id} not found`);
        return errorResponse(HttpStatus.NOT_FOUND, 'Food not found');
      }
      this.logger.log('Updated food successfully', food);
      return successResponse(food, 'Food updated successfully');
    } catch (error) {
      this.logger.error('Failed to update food', error.stack);
      return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<SuccessResponseDto<void> | ErrorResponseDto> {
    try {
      await this.foodService.delete(id);
      this.logger.log(`Food with id ${id} deleted successfully`);
      return successResponse(null, 'Food deleted successfully');
    } catch (error) {
      this.logger.error('Failed to delete food', error.stack);
      return errorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
    }
  }
}
