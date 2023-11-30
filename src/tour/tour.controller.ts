import { Controller, Get, Post, Body, Patch, Param, Headers, Query } from '@nestjs/common';
import { TourService } from './tour.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { ApiTags, ApiOperation, ApiParam, ApiConsumes, ApiHeader, ApiBody, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Tour } from './entities/tour.entity'

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
    description: 'Success',
  })
  create(@Body() createTourDto: CreateTourDto, @Headers('seller-id') sellerId: number) {
    // FIXME!! : use guard
    // FIXME!! : get seller id from caller identifiers
    return this.tourService.create(createTourDto, sellerId);
  }

  @Get('/schedule/:id')
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
  findAllAvailableDatesMonth(@Param('id') id: number, @Query('year-month') yearMonth: string) {    
    return this.tourService.findAllAvailableDatesMonth(id, new Date(yearMonth));
  }

  @Get('/token/:token')
  @ApiOperation({ summary: 'Get a tour by token' })
  @ApiParam({
    name: 'token',
    type: 'string'
  })
  @ApiResponse({ // FIXME!! : define response
    type: Tour
  })
  findOneByToken(@Param('token') token: string) {
    // TODO : use token instead of id
    return this.tourService.findOneByToken(token);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Tour for holiday settings' })
  @ApiParam({
    name: 'id',
    type: 'number',
  })
  @ApiConsumes('application/json')
  @ApiBody({
    type: UpdateTourDto,
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
