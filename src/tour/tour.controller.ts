import { Controller, Get, Post, Body, Patch, Param, Headers, Query } from '@nestjs/common';
import { TourService } from './tour.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { ApiTags, ApiOperation, ApiParam, ApiConsumes, ApiHeader, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';

@Controller('tour')
@ApiTags('Tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post()
  @ApiOperation({ summary: 'Create Tour' })
  @ApiConsumes('application/json')
  @ApiHeader({
    name: 'seller-id',
    description: 'Id of seller who owns the tour',
    required: true
  })
  @ApiBody({
    type: CreateTourDto,
    required: true
  })
  @ApiResponse({
    status: 201,
    description: 'Success'
  })
  // TODO : use guard
  // TODO : get seller-id from caller identities
  create(@Headers('seller-id') sellerId: number, @Body() createTourDto: CreateTourDto) {
    return this.tourService.create(+sellerId, createTourDto);
  }

  @Get('/:id/schedule')
  @ApiOperation({ summary: 'Get available date in a month of a tour' })
  @ApiQuery({
    name: 'year-month',
    type: 'string',
    example: "2023-12-01"
  })
  @ApiParam({
    name: 'id',
    type: 'string'
  })
  // TODO : year-month range test
  findAllAvailableDatesMonth(@Param('id') id: number, @Query('year-month') yearMonth: string) {    
    return this.tourService.findAllAvailableDatesMonth(+id, new Date(yearMonth));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Tour' })
  @ApiParam({
    name: 'id',
    type: 'number'
  })
  @ApiConsumes('application/json')
  @ApiBody({
    type: UpdateTourDto,
    description: 'offDays is an integer array, values between 0 and 6,\n'
      + '\trepresenting day of week, 0 for sunday 1 for monday and so on. \n'
      + 'offDates is an integer array, values between 1 and 31',
    required: true
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.tourService.update(+id, updateTourDto);
  }
}
