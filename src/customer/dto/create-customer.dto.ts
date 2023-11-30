import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ description: 'ID of Customer' })
  id: number;

  @ApiProperty({ description: 'Name of Customer' })
  name: string;
}
