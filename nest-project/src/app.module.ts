import { Module, MiddlewareConsumer } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { FoodModule } from './foods/food.module';
import { TransactionModule } from './transaction/transaction.module'; // Tambahkan import untuk TransactionModule
import { PrismaService } from './prisma/prisma.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    CustomerModule,
    FoodModule,
    TransactionModule, 
  ],
  providers: [PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
