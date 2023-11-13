import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBucketDto {
  @IsString()
  @ApiProperty({ example: 90, description: '구독 주기' })
  cycle: number;

  @IsNumber()
  @ApiProperty({ example: 90, description: '아이템ID' })
  ItemId: number;
}
