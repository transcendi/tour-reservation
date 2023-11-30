import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TourService } from './tour.service';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';

@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post()
  create(@Body() createTourDto: CreateTourDto) {
    return this.tourService.create(createTourDto);
  }

  @Get()
  findAll() {
    return this.tourService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourService.findOne(+id);
  }

  @Patch(':id')
  // @ApiOperation({ summary: 'Update Seller for holiday settings' })
  // @ApiParam({
  //   name: 'id',
  //   type: 'number',
  // })
  // @ApiConsumes('application/json')
  // @ApiBody({
  //   description: 'post swagger',
  //   type: UpdateSellerDto,
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Success',
  // })
  // update(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
  //   return this.sellerService.update(+id, updateSellerDto);
  // }
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.tourService.update(+id, updateTourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourService.remove(+id);
  }
}
