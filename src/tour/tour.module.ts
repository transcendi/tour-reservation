import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { DatabaseModule } from '../database/database.module';
import { tourProviders } from './tour.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TourController],
  providers: [
    ...tourProviders,
    TourService
  ],
})
export class TourModule {}
