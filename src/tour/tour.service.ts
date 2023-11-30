import { Injectable } from '@nestjs/common';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@Injectable()
export class TourService {
  create(createTourDto: CreateTourDto) {
    return 'This action adds a new tour';
  }

  findAll() {
    return `This action returns all tour`;
  }

  findOne(id: number) {
    
    // MySQL Array retrun only string so convert to number
    // if(seller !== null) {
    //   seller.off_days = seller.off_days.map(Number);
    //   seller.off_dates = seller.off_dates.map(Number);
    // }
    return `This action returns a #${id} tour`;
  }

  update(id: number, updateTourDto: UpdateTourDto) {
    return `This action updates a #${id} tour`;
  }

  remove(id: number) {
    return `This action removes a #${id} tour`;
  }
}
