import { Controller, Post, Body } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('customer')
@ApiTags('Customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiOperation({ summary: 'Create Customer' })
  @ApiConsumes('application/json')
  @ApiBody({
    description: 'Data for create customer',
    type: CreateCustomerDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Success',
  })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }
}
