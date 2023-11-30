import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { DatabaseModule } from '../database/database.module';
import { customerProviders } from './customer.providers';
import { CreateCustomerDto } from './dto/create-customer.dto';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        ...customerProviders,
        CustomerService
      ]
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  describe('CRUD', () => {
    it('should create, read, update, delete seller', async () => {
      const customerDto: CreateCustomerDto = {
        id: 1,
        name: 'First Customer'
      };
      await service.create(customerDto);
      let seller = await service.findOne(1);
      expect(seller).toEqual(customerDto);
      customerDto.name = 'One Customer';
      await service.update(1, customerDto);
      seller = await service.findOne(1);
      expect(seller).toEqual(customerDto);
      await service.remove(1);
      seller = await service.findOne(1);
      expect(seller).toBeNull();
    });
  });
});
