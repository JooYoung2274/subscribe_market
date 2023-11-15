import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBucketDto {
  @IsString()
  @ApiProperty({ example: 90, description: '구독 주기', nullable: false })
  cycle: number;
}
