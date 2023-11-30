import { PartialType } from '@nestjs/mapped-types';
import { CreateSellerDto } from './create-seller.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSellerDto extends PartialType(CreateSellerDto) {
  @ApiProperty({ description: 'Off days of week stored as numeric array' })
  off_days: number[];

  @ApiProperty({ description: 'Off dates stored as numeric array' })
  off_dates: number[];    
}
