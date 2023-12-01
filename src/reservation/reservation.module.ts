import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { DatabaseModule } from '../database/database.module';
import { reservationProviders } from './reservation.providers';
import { tourProviders } from '../tour/tour.providers';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [ReservationController],
  providers: [
    ...reservationProviders,
    ...tourProviders,
    ReservationService
  ],
})
export class ReservationModule {}
