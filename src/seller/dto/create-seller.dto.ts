import { ApiProperty } from '@nestjs/swagger';

export class CreateSellerDto {
  id: number;

  @ApiProperty({ description: 'Name of Seller' })
  name: string;
}
