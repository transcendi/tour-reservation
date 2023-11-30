import { ApiProperty } from '@nestjs/swagger';

export class CreateSellerDto {
  id: number;

  @ApiProperty({ description: 'Name of Seller' })
  name: string;

  @ApiProperty({ description: 'Off days of week stored as numeric array' })
  off_days: number[];

  @ApiProperty({ description: 'Off dates stored as numeric array' })
  off_dates: number[];    
}
