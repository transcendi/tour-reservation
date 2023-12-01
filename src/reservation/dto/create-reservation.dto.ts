import { ApiProperty } from '@nestjs/swagger';
import { ReservationState } from '../entities/reservation.entity';

export class CreateReservationDto {
  id: number;

  state: ReservationState;

  @ApiProperty({ 
    description: 'Date of tour',
    type: Date
  })
  date: Date;
}
