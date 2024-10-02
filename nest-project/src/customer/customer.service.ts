import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dto/customer-dto';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.customer.findMany();
  }


  async create(data: CreateCustomerDto) {
    return this.prisma.customer.create({
      data,
    });
  }

  async update(id: number, data: UpdateCustomerDto) {
   
    return this.prisma.customer.update({
      where: { customer_id: id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.phone && { phone: data.phone }),
        ...(data.address && { address: data.address }),
      },
    });
  }

  async delete(id: number) {
    return this.prisma.customer.delete({
      where: { customer_id: id },
    });
  }
}

