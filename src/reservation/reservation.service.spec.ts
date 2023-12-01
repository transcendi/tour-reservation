import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { DatabaseModule } from '../database/database.module';
import { reservationProviders } from './reservation.providers';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationState } from './entities/reservation.entity';
import { tourProviders } from '../tour/tour.providers';

describe('ReservationService', () => {
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule
      ],
      providers: [
        ...reservationProviders,
        ...tourProviders,
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
      let createdReservation = await service.create(1, 5, {
        id: 1,
        date: new Date('2023-12-06'),
        state: ReservationState.PENDING
      });
      let reservation = await service.findOneByToken(createdReservation.token);
      expect(reservation).toEqual(createdReservation);
      
      await service.updateByToken(createdReservation.token, {
        token: createdReservation.token,
        state: ReservationState.CONFIRM
      });

      reservation = await service.findOne(1);
      expect(reservation.state).toEqual(ReservationState.CONFIRM);

      // token should be expired
      reservation = await service.findOneByToken(createdReservation.token);
      expect(reservation).toBeNull();
      
      await service.remove(1);
    });
  });
});
