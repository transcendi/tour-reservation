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
  @ApiOperation({ summary: 'Create Tour' })
  @ApiConsumes('application/json')
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
  @ApiBody({
    type: CreateReservationDto,
    required: true
  })
  @ApiResponse({
    status: 201,
    description: 'Success',
  })
  create(@Headers('customer-id') customerId: number, @Query('tour-id') tourId: number, @Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(customerId, tourId, createReservationDto);
  }

  @Get('/token/:token')
  @ApiOperation({ summary: 'Get a reservation by token' })
  @ApiParam({
    name: 'token',
    type: 'string'
  })
  @ApiResponse({ // FIXME!! : define response
    type: Reservation
  })
  findOneByToken(@Param('token') token: string) {
    // TODO : use token instead of id
    return this.reservationService.findOneByToken(token);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Reservation state' })
  @ApiParam({
    name: 'id',
    type: 'number'
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
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  // @Delete('/token/:token')
  // @ApiOperation({ summary: 'Update Tour for holiday settings' })
  // @ApiParam({
  //   name: 'token',
  //   type: 'string'
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'OK',
  // })
  // delete(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
  //   return this.reservationService.update(+id, updateReservationDto);
  // }
}
