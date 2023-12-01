import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SellerModule } from './seller/seller.module';
import { TourModule } from './tour/tour.module';
import { CustomerModule } from './customer/customer.module';
import { ReservationModule } from './reservation/reservation.module';
import { DatabaseModule } from './database/database.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { CacheModule } from './cache/cache.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisConfigService } from './cache/cache.config';

@Module({
  imports: [
    SellerModule, 
    TourModule, 
    CustomerModule, 
    ReservationModule, 
    DatabaseModule, 
    ConfigModule.forRoot(),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useClass: RedisConfigService,
      inject: [ConfigService],
    }),
    CacheModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
