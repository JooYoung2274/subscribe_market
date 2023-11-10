import { Module } from '@nestjs/common';
import { BucketController } from './bucket.controller';
import { BucketService } from './bucket.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bucket } from '../entities/bucket';
import { Items } from '../entities/item';

@Module({
  imports: [TypeOrmModule.forFeature([Bucket, Items])],
  controllers: [BucketController],
  providers: [BucketService],
})
export class BucketModule {}
