import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFoodDto, UpdateFoodDto } from 'src/dto/food-dto';

@Injectable()
export class FoodService {
  private readonly logger = new Logger(FoodService.name);

  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.foods.findMany();
  }

  async create(data: CreateFoodDto) {
    return this.prisma.foods.create({
      data,
    });
  }

  async update(id: number, data: UpdateFoodDto) {
    return this.prisma.foods.update({
      where: { food_id: id },
      data: {
        ...(data.food_name && { food_name: data.food_name }),
        ...(data.price && { price: data.price }),
        ...(data.stock && { stock: data.stock }),
      },
    });
  }

  async delete(id: number) {
    return this.prisma.foods.delete({
      where: { food_id: id },
    });
  }
}
