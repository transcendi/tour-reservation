import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerService } from './seller.service';
import { SellerController } from './seller.controller';
import { Seller } from './entities/seller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Seller])],
  controllers: [SellerController],
  providers: [SellerService],
  exports: [TypeOrmModule]
})
export class SellerModule {}
