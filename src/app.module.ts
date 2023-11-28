import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerModule } from './seller/seller.module';
import { TourModule } from './tour/tour.module';
import { CustomerModule } from './customer/customer.module';
import { ReservationModule } from './reservation/reservation.module';
import { Seller, Tour, Customer, Reservation } from './entities/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'tour-reservation',
      password: 'aA1!aA1!',
      database: 'tour_reservation',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Seller, Tour, Customer, Reservation
    ]),
    SellerModule, TourModule, CustomerModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
