import { Test, TestingModule } from '@nestjs/testing';
import { TourService } from './tour.service';

describe('TourService', () => {
  let service: TourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TourService],
    }).compile();

    service = module.get<TourService>(TourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  // describe('CRUD', () => {
  //   it('should create, read, update, delete seller', async () => {
  //     const sellerDto: CreateSellerDto = {
  //       id: 1,
  //       name: 'First Seller',
  //       off_days: [6, 7],
  //       off_dates: [1, 5, 10]
  //     };
  //     await service.create(sellerDto);
  //     let seller = await service.findOne(1);
  //     expect(seller).toEqual(sellerDto);
  //     sellerDto.off_dates = [15, 30];
  //     await service.update(1, sellerDto);
  //     seller = await service.findOne(1);
  //     expect(seller).toEqual(sellerDto);
  //     await service.remove(1);
  //     seller = await service.findOne(1);
  //     expect(seller).toBeNull();
  //   });
  // });
});
