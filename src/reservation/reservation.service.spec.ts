import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { DatabaseModule } from '../database/database.module';
import { reservationProviders } from './reservation.providers';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { TourModule } from '../tour/tour.module';
import { ReservationState } from './entities/reservation.entity';

describe('ReservationService', () => {
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        TourModule
      ],
      providers: [
        ...reservationProviders,
        ReservationService
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CRUD', () => {
    it('should create, read, update, delete seller', async () => {
      for(let i = 5 ; i <= 6 ; i++) {
        const reservationDto: CreateReservationDto = {
          id: i,
          date: new Date('2023-12-06'),
          state: ReservationState.PENDING
        };
        await service.create(3, 5, reservationDto);
      }
      // let seller = await service.findOne(1);
      // expect(seller).toEqual(sellerDto);
      // sellerDto.name = 'One Seller';
      // await service.update(1, sellerDto);
      // seller = await service.findOne(1);
      // expect(seller).toEqual(sellerDto);
      // await service.remove(1);
      // seller = await service.findOne(1);
      // expect(seller).toBeNull();
    });
  });
});
