import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { DatabaseModule } from '../database/database.module';
import { reservationProviders } from './reservation.providers';
import { TourModule } from '../tour/tour.module';

@Module({
  imports: [
    DatabaseModule,
    TourModule
  ],
  controllers: [ReservationController],
  providers: [
    ...reservationProviders,
    ReservationService
  ],
})
export class ReservationModule {}
