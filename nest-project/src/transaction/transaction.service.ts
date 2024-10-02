import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto, UpdateTransactionDto } from 'src/dto/transaction-dto';

@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);

  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.transactions.findMany({
      include: {
        customer: true,
        foods: true,
      },
    });
  }

  async create(data: CreateTransactionDto) {
    const { customer_id, food_id, qty } = data;

    // check customer id
    const customer = await this.prisma.customer.findUnique({
      where: { customer_id },
    });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // check food id
    const food = await this.prisma.foods.findUnique({
      where: { food_id },
    });
    if (!food) {
      throw new NotFoundException('Food not found');
    }

    // check stock
    if (food.stock < qty) {
      throw new BadRequestException('Insufficient stock');
    }

    const total_price = food.price * qty;
    
    const transaction = await this.prisma.transactions.create({
      data: {
        customer_id,
        food_id,
        qty,
        total_price,
      },
    });

    // Update stock
    await this.prisma.foods.update({
      where: { food_id },
      data: { stock: food.stock - qty },
    });

    return transaction;
  }

  async update(id: number, data: UpdateTransactionDto) {
    const transaction = await this.prisma.transactions.findUnique({
      where: { transaction_id: id },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    if (data.qty) {
      const food = await this.prisma.foods.findUnique({
        where: { food_id: transaction.food_id },
      });
      if (!food) {
        throw new NotFoundException('Food not found');
      }

      const total_price = food.price * data.qty;

      // Update data
      return this.prisma.transactions.update({
        where: { transaction_id: id },
        data: {
          ...data,
          total_price,
        },
      });
    }

    return this.prisma.transactions.update({
      where: { transaction_id: id },
      data,
    });
  }

  async delete(id: number) {
    const transaction = await this.prisma.transactions.findUnique({
      where: { transaction_id: id },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return this.prisma.transactions.delete({
      where: { transaction_id: id },
    });
  }
}
