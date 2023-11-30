import { Test, TestingModule } from '@nestjs/testing';
import { TourService } from './tour.service';
import { DatabaseModule } from '../database/database.module';
import { tourProviders } from './tour.providers';
import { CreateTourDto } from './dto/create-tour.dto';

describe('TourService', () => {
  let service: TourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        ...tourProviders,
        TourService
      ]
    }).compile();

    service = module.get<TourService>(TourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  describe('CRUD', () => {
    it('should create, read, update, delete seller', async () => {
      const tourDto: CreateTourDto = {
        id: 1,
        name: 'First Tour',
        offDays: [6, 7],
        offDates: [1, 5, 10]
      };
      await service.create(tourDto, 7);
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
