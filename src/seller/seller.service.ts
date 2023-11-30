import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { Seller } from './entities/seller.entity';

@Injectable()
export class SellerService {
  constructor(
    @Inject('SELLER_REPOSITORY')
    private sellerRepository: Repository<Seller>,
  ) {}

  async create(createSellerDto: CreateSellerDto) {
    const seller = this.sellerRepository.create(createSellerDto);    
    return await this.sellerRepository.insert(seller);
  }

  async findOne(id: number) {
    const seller = await this.sellerRepository.findOne({
      where: {
        id
      }
    });
    // MySQL Array retrun only string so convert to number
    if(seller !== null) {
      seller.off_days = seller.off_days.map(Number);
      seller.off_dates = seller.off_dates.map(Number);
    }
    return seller;
  }

  async update(id: number, updateSellerDto: UpdateSellerDto) {
    return await this.sellerRepository.update(id, updateSellerDto);
  }

  async delete(id: number) {
    return await this.sellerRepository.delete(id);
  }
}
