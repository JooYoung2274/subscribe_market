import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Bucket } from '../entities/bucket';
import { CreateBucketDto } from './dto/CreateBucketDto';

@Injectable()
export class BucketRepository {
  constructor(
    @InjectRepository(Bucket) private bucketRepository: Repository<Bucket>,
  ) {}

  async createBucket(body: CreateBucketDto, user): Promise<Bucket> {
    const { id } = user;
    const { cycle, ItemId } = body;
    const newBucket = this.bucketRepository.create();
    newBucket.UserId = id;
    newBucket.cycle = cycle;
    newBucket.ItemId = ItemId;
    return await this.bucketRepository.save(newBucket);
  }

  async deleteBucket(id: number, user) {
    await this.bucketRepository.delete({
      id: id,
      UserId: user.id,
    });
    return;
  }

  async findOneById(id: number) {
    return await this.bucketRepository.findOne({ where: { id } });
  }

  async save(bucket: Bucket): Promise<Bucket> {
    return await this.bucketRepository.save(bucket);
  }
}
