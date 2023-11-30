import { PartialType } from '@nestjs/mapped-types';
import { CreateTourDto } from './create-tour.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTourDto extends PartialType(CreateTourDto) {
    
  @ApiProperty({ description: 'Off days of week stored as numeric array' })
  off_days: number[];

  @ApiProperty({ description: 'Off dates stored as numeric array' })
  off_dates: number[];    
}
