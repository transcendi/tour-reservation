import { Injectable } from '@nestjs/common';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  create(createReservationDto: CreateReservationDto) {
    // put reservation by Customer
    // get count (reservation) of seller where date = tour date
    // if(count > 5)
    //   state = pending
    // else
    //   state = confirmed
    // return token
    return 'This action adds a new reservation';
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    // confirm by Seller
    // id = redis.get(token)
    // reservation.update(id, state = confirm)
    // redis.expire(token)

    // cancel by Customer
    // id = redis.get(token)
    // if(date - now > 3)
    //  fail
    // reservation.update(id, state = cancel)
    // redis.expire(token)
    return `This action updates a #${id} reservation`;
  }
}
