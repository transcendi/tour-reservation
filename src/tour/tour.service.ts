import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { Seller } from '../seller/entities/seller.entity';
import { Tour } from './entities/tour.entity';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class TourService {
  constructor(
    @Inject('TOUR_REPOSITORY')
    private tourRepository: Repository<Tour>,
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
    @InjectRedis()
    private readonly redis: Redis
  ) {}

  async create(sellerId: number, createTourDto: CreateTourDto) {
    const tour = this.tourRepository.create(createTourDto);
    const insertResult = await this.tourRepository.insert(tour);
    try {
      await this.dataSource.createQueryBuilder().
        relation(Seller, 'tours').of(sellerId).add(insertResult.identifiers[0].id);
    }
    catch(error) {
      throw new HttpException('Set tour relation error', HttpStatus.CONFLICT );
    }
    return tour;
  }

  async findAll(options?: FindManyOptions<Tour>) {
    return await this.tourRepository.find(options)
  }

  async findAllAvailableDatesMonth(id: number, yearMonth: Date): Promise<Date[]> {
    // generate redis key
    const redisKey = `tour:${id}:schedule:`
    + `${yearMonth.getUTCFullYear()}:${yearMonth.getUTCMonth()}`;
    // if cached schedule exist return
    const cachedSchedule = await this.redis.get(redisKey);
    if(cachedSchedule) {
      return JSON.parse(cachedSchedule);
    }

    const tour: Tour = await this.findOne(id);
    if(!tour) {
      throw new HttpException('Find a tour error', HttpStatus.NOT_FOUND );
    }
    // find dates excluding off days and off dates in a given month
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

    // set cache
    await this.redis.set(redisKey, JSON.stringify(dates));

    return dates;
  }

  async findOne(id: number): Promise<Tour> {
    const tour: Tour = await this.tourRepository.findOne({ 
      relations: ['seller'],
      where: { id }
    });
    if(!tour) {
      throw new HttpException('Find a tour error', HttpStatus.NOT_FOUND );
    }
    // MySQL Array retrun only strings so convert to number
    tour.offDays = tour.offDays?.map(Number);
    tour.offDates = tour.offDates?.map(Number);
    return tour;
  }

  async update(id: number, updateTourDto: UpdateTourDto) {
    // refresh cache
    // TODO : implement refresh cache
    // // generate redis key
    // const redisKey = `tour:${id}:schedule:`
    // + `${yearMonth.getUTCFullYear()}:${yearMonth.getUTCMonth()}`;
    // this.redis.scan()
    return await this.tourRepository.update(id, updateTourDto);
  }

  async remove(id: number) {
    return await this.tourRepository.delete(id);
  }
}
