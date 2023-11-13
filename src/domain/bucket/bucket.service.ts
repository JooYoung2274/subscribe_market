import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bucket } from '../entities/bucket';
import { Repository } from 'typeorm';
import { Items } from '../entities/item';
import { CreateBucketDto } from './dto/CreateBucketDto';
import { BucketRepository } from './bucket.repository';

@Injectable()
export class BucketService {
  constructor(
    private readonly bucketRepository: BucketRepository,
    @InjectRepository(Items) private itemRepository: Repository<Items>,
  ) {}

  async createBucket(body: CreateBucketDto, user): Promise<Bucket> {
    const result = await this.bucketRepository.createBucket(body, user);
    return result;
  }

  async getBucket(user) {
    const { id } = user;

    return await this.itemRepository
      .createQueryBuilder('i')
      .innerJoin('i.Bucket', 'b')
      .where('b.UserId =:id', { id })
      .getRawMany();
  }

  async deleteBucket(param, user): Promise<void> {
    await this.bucketRepository.deleteBucket(param, user);
    return;
  }

  async updateBucket(body, param, user): Promise<Bucket> {
    const { cycle } = body;
    const { BucketId } = param;
    const { id } = user;

    const isBucket = await this.bucketRepository.findOneById(BucketId);

    if (!isBucket) {
      throw new BadRequestException('잘못된 요청');
    }

    if (isBucket.UserId !== id) {
      throw new BadRequestException('권한이 없음');
    }

    isBucket.cycle = cycle;
    return await this.bucketRepository.save(isBucket);
  }
}
