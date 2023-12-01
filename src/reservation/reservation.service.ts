import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation, ReservationState } from './entities/reservation.entity';
import { Tour } from '../tour/entities/tour.entity';
import { Customer } from '../customer/entities/customer.entity';

@Injectable()
export class ReservationService {
  constructor(
    @Inject('RESERVATION_REPOSITORY')
    private reservationRepository: Repository<Reservation>,
    @Inject('TOUR_REPOSITORY')
    private tourRepository: Repository<Tour>,
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
  ) {}

  async create(customerId: number, tourId: number, createReservationDto: CreateReservationDto) {
    // get tour
    const tour: Tour = await this.tourRepository.findOne({ 
      relations: ['seller'],
      where: { id: tourId }
    });
    if(!tour) {
      throw new HttpException('Find a tour error', HttpStatus.NOT_FOUND );
    }
    // MySQL Array retrun only strings so convert to number
    tour.offDays = tour.offDays?.map(Number);
    tour.offDates = tour.offDates?.map(Number);

    // check is unavailable date
    const inputDate = createReservationDto.date;
    const tourDate = new Date(inputDate.getUTCFullYear(), inputDate.getUTCMonth(), inputDate.getUTCDate(), 9);
    if(tour.offDays.includes(createReservationDto.date.getUTCDay())
      || tour.offDates.includes(createReservationDto.date.getUTCDate())) {
      throw new HttpException('Unavailable date', HttpStatus.CONFLICT );      
    }

    // FIXME!! : group by transaction...

    // get confirmed reservations of input date owns owner of tour
    const tours = await this.tourRepository.find({
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
  
  async findOneByToken(token: string): Promise<Reservation> {
    return this.reservationRepository.findOneBy({ token });
  }

  async updateByToken(token: string, updateReservationDto: UpdateReservationDto) {
    // set token expired
    updateReservationDto.token = token.replace('-', '_');
    return await this.reservationRepository.update({ token }, updateReservationDto);
  }

  async updateByTokenFromCustomer(token: string, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.findOneByToken(token);
    if(!reservation) {
      throw new HttpException('Invalid reservation token', HttpStatus.NOT_FOUND );
    }
    // cannot update 3 days before tour
    if((reservation.date.getTime() - (new Date()).getTime())/(24 * 3600 * 1000) < 3) {
      throw new HttpException('Update unavailable date', HttpStatus.BAD_REQUEST );
    }

    return await this.updateByToken(token, updateReservationDto);
  }
  
  async remove(id: number) {
    return await this.reservationRepository.delete(id);
  }
}
