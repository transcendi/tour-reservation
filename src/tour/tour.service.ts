import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Seller } from '../seller/entities/seller.entity';
import { Tour } from './entities/tour.entity';

@Injectable()
export class TourService {
  constructor(
    @Inject('TOUR_REPOSITORY')
    private tourRepository: Repository<Tour>,
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {}

  async create(createTourDto: CreateTourDto, sellerId: number) {
    const tour = this.tourRepository.create(createTourDto);
    const insertResult = await this.tourRepository.insert(tour);
    try {
      await this.dataSource.createQueryBuilder().
        relation(Seller, 'tours').of(sellerId).add(insertResult.identifiers[0].id);
    }
    catch(error) {
      throw new HttpException('Create tour error', HttpStatus.INTERNAL_SERVER_ERROR );
    }
    return tour;
  }

  async findAllAvailableDatesMonth(id: number, yearMonth: Date): Promise<Date[]> {
    const tour: Tour = await this.findOne(id);
    if(!tour) {
      throw new HttpException('Find a tour error', HttpStatus.NOT_FOUND );
    }
    const from = new Date(yearMonth.getUTCFullYear(), yearMonth.getUTCMonth(), 1, 9);
    const to = new Date(yearMonth.getUTCFullYear(), yearMonth.getUTCMonth() + 1, 1, 9);
    const dates = [];
    for (let d = from; d < to; d.setDate(d.getDate() + 1)) {
      if(tour.offDays?.includes(d.getUTCDay())
        || tour.offDates?.includes(d.getUTCDate())) {
        continue;
      }
      dates.push(new Date(d));
    }
    return dates;
  }

  async findOne(id: number) {
    const tour: Tour = await this.tourRepository.findOne({ where: { id }});
    if(!tour) {
      throw new HttpException('Find a tour error', HttpStatus.NOT_FOUND );
    }
    // MySQL Array retrun only strings so convert to number
    tour.offDays = tour.offDays?.map(Number);
    tour.offDates = tour.offDates?.map(Number);
    return tour;
  }

  async findOneByToken(token: String) {
    // TODO : convert token to id
    const id = 1;
    return this.findOne(id);
  }

  async update(id: number, updateTourDto: UpdateTourDto) {
    return await this.tourRepository.update(id, updateTourDto);
  }

  async remove(id: number) {
    return await this.tourRepository.delete(id);
  }
}
