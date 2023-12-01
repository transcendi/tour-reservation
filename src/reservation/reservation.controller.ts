import { Controller, Headers, Param, Query, Body, Get, Post, Patch, Delete } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiTags, ApiOperation, ApiParam, ApiConsumes, ApiHeader, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Reservation } from './entities/reservation.entity'

@Controller('reservation')
@ApiTags('Reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @ApiOperation({ summary: 'Create Reservation' })
  @ApiHeader({
    name: 'customer-id',
    description: 'Id of customer who book the reservation',
    required: true
  })
  @ApiQuery({
    name: 'tour-id',
    type: 'number',
    required: true
  })
  @ApiConsumes('application/json')
  @ApiBody({
    type: CreateReservationDto,
    required: true
  })
  @ApiResponse({
    status: 201,
    description: 'Success',
  })
  // TODO : use guard
  // TODO : get customer-id from caller identities
  create(
    @Headers('customer-id') customerId: number, 
    @Query('tour-id') tourId: number, 
    @Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(customerId, tourId, createReservationDto);
  }

  @Get('/token/:token')
  @ApiOperation({ summary: 'Get a reservation by token' })
  @ApiParam({
    name: 'token',
    type: 'string'
  })
  @ApiResponse({ 
    type: Reservation // FIXME!! : define response
  })
  findOneByToken(@Param('token') token: string) {
    return this.reservationService.findOneByToken(token);
  }

  @Patch('/token/:token')
  @ApiOperation({ summary: 'Update Reservation' })
  @ApiHeader({
    name: 'call-by',
    description: 'Role of requesting client, "Seller" or "Customer"'
  })
  @ApiParam({
    name: 'token',
    type: 'string'
  })
  @ApiConsumes('application/json')
  @ApiBody({
    type: UpdateReservationDto,
    required: true
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  // TODO : use guard
  // TODO : get seller-id from caller identities
  updateByToken(
    @Param('token') token: string, 
    @Headers('call-by') callBy: string, 
    @Body() updateReservationDto: UpdateReservationDto) {
    if(callBy == 'Customer') {
      return this.reservationService.updateByTokenFromCustomer(token, updateReservationDto);      
    }
    return this.reservationService.updateByToken(token, updateReservationDto);
  }
}
