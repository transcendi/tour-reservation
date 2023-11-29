import { PartialType } from '@nestjs/mapped-types';
import { CreateSellerDto } from './create-seller.dto';

export class UpdateSellerDto extends PartialType(CreateSellerDto) {
  rest_days: number[];
  days_off: number[];   
}
