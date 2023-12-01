import { Test, TestingModule } from '@nestjs/testing';
import { TourService } from './tour.service';
import { DatabaseModule } from '../database/database.module';
import { tourProviders } from './tour.providers';
import { CreateTourDto } from './dto/create-tour.dto';
import { getRedisToken } from '@liaoliaots/nestjs-redis';

describe('TourService', () => {
  let service: TourService;
  let get: jest.Mock;
  let set: jest.Mock;
  let del: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        { 
          provide: getRedisToken('namespace'), 
          useValue: {
            get,
            set,
            del
          }
        },
        ...tourProviders,
        TourService
      ]
    }).compile();

    service = module.get<TourService>(TourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  // TODO : mock redis https://github.com/liaoliaots/nestjs-redis/blob/fc697638af9ecf80ad2992a923047c626f2bf95b/sample/01-testing-inject/src/cats/cats.service.spec.ts
  describe('CRUD', () => {
    it('should create, read, update, delete seller', async () => {
      const tourDto: CreateTourDto = {
        id: 1,
        name: 'First Tour',
        offDays: [6, 7],
        offDates: [1, 5, 10]
      };
      await service.create(7, tourDto);
      let tour = await service.findOne(1);
      expect(tour).toEqual(tourDto);
      tourDto.offDates = [15, 30];
      await service.update(1, tourDto);
      tour = await service.findOne(1);
      expect(tour).toEqual(tourDto);
      await service.remove(1);
      tour = await service.findOne(1);
      expect(tour).toBeNull();
    });
  });

  // FIXME!! : close connection after testing
});
