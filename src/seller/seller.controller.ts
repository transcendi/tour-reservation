import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { ApiTags, ApiOperation, ApiParam, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('seller')
@ApiTags('Seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  @ApiOperation({ summary: 'Create Seller' })
  @ApiConsumes('application/json')
  @ApiBody({
    description: 'Data for create seller',
    type: CreateSellerDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Success',
  })
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellerService.create(createSellerDto);
  }
}
