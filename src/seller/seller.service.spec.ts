import { Test, TestingModule } from '@nestjs/testing';
import { SellerService } from './seller.service';
import { DatabaseModule } from '../database/database.module';
import { sellerProviders } from './seller.providers';
import { CreateSellerDto } from './dto/create-seller.dto';

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

  describe('CRUD', () => {
    it('should create, read, update, delete seller', async () => {
      const sellerDto: CreateSellerDto = {
        id: 1,
        name: 'First Seller'
      };
      await service.create(sellerDto);
      let seller = await service.findOne(1);
      expect(seller).toEqual(sellerDto);
      sellerDto.name = 'One Seller';
      await service.update(1, sellerDto);
      seller = await service.findOne(1);
      expect(seller).toEqual(sellerDto);
      await service.remove(1);
      seller = await service.findOne(1);
      expect(seller).toBeNull();
    });
  });
});
