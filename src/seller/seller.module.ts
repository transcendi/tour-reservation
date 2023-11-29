import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { DatabaseModule } from '../database/database.module';
import { sellerProviders } from './seller.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [SellerController],
  providers: [
    ...sellerProviders,
    SellerService
  ]
})
export class SellerModule {}
