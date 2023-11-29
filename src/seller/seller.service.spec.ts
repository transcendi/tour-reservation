import { Test, TestingModule } from '@nestjs/testing';
import { SellerService } from './seller.service';
import { DatabaseModule } from '../database/database.module';
import { sellerProviders } from './seller.providers';

describe('SellerService', () => {
  let service: SellerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        ...sellerProviders,
        SellerService
      ]
    }).compile();

    service = module.get<SellerService>(SellerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create three sellers', async () => {
      const seller = await service.create({
        name: 'First Seller',
        rest_days: [1, 2, 3],
        days_off: [4, 5, 6]
      });
      console.log(seller);
      expect(seller).toHaveProperty('id');
    });
  });
});
