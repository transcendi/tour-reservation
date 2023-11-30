import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { DatabaseModule } from '../database/database.module';
import { customerProviders } from './customer.providers';


@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [
    ...customerProviders,
    CustomerService
  ],
})
export class CustomerModule {}
