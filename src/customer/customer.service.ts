import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerRepository.create(createCustomerDto);    
    return await this.customerRepository.insert(customer);
  }

  async findOne(id: number) {
    return await this.customerRepository.findOne({
      where: {
        id
      }
    });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return await this.customerRepository.update(id, updateCustomerDto);
  }

  async remove(id: number) {
    return await this.customerRepository.delete(id);
  }
}
