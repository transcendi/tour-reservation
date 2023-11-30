import { ApiProperty } from '@nestjs/swagger';

export class UpdateTourDto {
  @ApiProperty({ 
    description: 'Off days of week stored as numeric array',
    type: [Number]
  })
  offDays: number[];

  @ApiProperty({ 
    description: 'Off dates stored as numeric array',
    type: [Number]
  })
  offDates: number[];
}
