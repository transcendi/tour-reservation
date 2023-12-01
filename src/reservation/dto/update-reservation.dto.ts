// import { forwardRef } from '@nestjs/common';
import { ReservationState } from '../entities/reservation.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReservationDto {
  @ApiProperty({ 
    description: 'State of tour',
    // type: forwardRef(() => ReservationState) // FIXME!! : Causes circular references
  })
  state: ReservationState;
}
