import { ApiProperty } from '@nestjs/swagger';

export class CreateSellerDto {
  @ApiProperty({ description: 'ID of Seller' })
  id: number;

  @ApiProperty({ description: 'Name of Seller' })
  name: string;
}
