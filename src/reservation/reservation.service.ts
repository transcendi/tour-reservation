import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation, ReservationState } from './entities/reservation.entity';
import { Tour } from '../tour/entities/tour.entity';
import { TourService } from '../tour/tour.service';
import { Customer } from '../customer/entities/customer.entity';

@Injectable()
export class ReservationService {
  constructor(
    @Inject('RESERVATION_REPOSITORY')
    private reservationRepository: Repository<Reservation>,
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
    private tourService: TourService
  ) {}

  async create(customerId: number, tourId: number, createReservationDto: CreateReservationDto) {
    const tour = await this.tourService.findOne(tourId);
    const inputDate = createReservationDto.date;
    const tourDate = new Date(inputDate.getUTCFullYear(), inputDate.getUTCMonth(), inputDate.getUTCDate(), 9);
    if(tour.offDays.includes(createReservationDto.date.getUTCDay())
      || tour.offDates.includes(createReservationDto.date.getUTCDate())) {
      throw new HttpException('Unavailable date', HttpStatus.CONFLICT );      
    }

    // get confirmed reservations of input date owns owner of tour
    const tours = await this.tourService.findAll({
      relations: {
        seller: true,
        reservations: true
      },
      where: {
        seller: {
          id: tour.seller.id
        },
        reservations: {
          state: ReservationState.CONFIRM,
          date: tourDate
        }
      }
    });

    let confirmCount = 0;
    for(const tour of tours) {
      confirmCount += tour.reservations?.length ?? 0;
    }

    // if count > 5 set state pending else confirm
    if(confirmCount >= 5) {
      createReservationDto.state = ReservationState.PENDING;
    }
    else {
      createReservationDto.state = ReservationState.CONFIRM;
    }

    // insert and set relation
    const reservation = this.reservationRepository.create(createReservationDto);
    const insertResult = await this.reservationRepository.insert(reservation);
    try {
      await this.dataSource.createQueryBuilder().
        relation(Customer, 'reservations').of(customerId).add(insertResult.identifiers[0].id);
      await this.dataSource.createQueryBuilder().
        relation(Tour, 'reservations').of(tourId).add(insertResult.identifiers[0].id);
    }
    catch(error) {
      throw new HttpException('Set reservation relation error', HttpStatus.CONFLICT );
    }

    return reservation;
  }

  async findOne(id: number): Promise<Reservation> {    
    return await this.reservationRepository.findOne({ where: { id }});
  }

  async findOneByToken(token: String): Promise<Reservation> {
    // TODO : convert token to id
    const id = 1;
    return this.findOne(id);
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    // confirm by Seller
    // id = redis.get(token)
    // reservation.update(id, state = confirm)
    // redis.expire(token)

    return await this.reservationRepository.update(id, updateReservationDto);
  }

  async remove(id: number) {
    // cancel by Customer
    // id = redis.get(token)
    // if(date - now > 3)
    //  fail
    // reservation.update(id, state = cancel)
    // redis.expire(token)
    return await this.reservationRepository.delete(id);
  }
}
