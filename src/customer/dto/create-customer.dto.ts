import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  id: number;

  @ApiProperty({ description: 'Name of Customer' })
  name: string;
}
