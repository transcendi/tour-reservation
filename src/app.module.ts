import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellerModule } from './seller/seller.module';
import { TourModule } from './tour/tour.module';
import { CustomerModule } from './customer/customer.module';
import { ReservationModule } from './reservation/reservation.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    SellerModule, TourModule, CustomerModule, ReservationModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
