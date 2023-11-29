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
    return await this.sellerRepository.save(createSellerDto);
  }

  update(id: number, updateSellerDto: UpdateSellerDto) {
    return this.sellerRepository.update(id, updateSellerDto);
  }
}
