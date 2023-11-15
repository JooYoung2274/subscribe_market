import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bucket } from '../entities/bucket';
import { Repository } from 'typeorm';
import { Items } from '../entities/item';
import { CreateBucketDto } from './dto/CreateBucketDto';
import { BucketRepository } from './bucket.repository';
import { UpdateBucketDto } from './dto/UpdateBucketDto';

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

  async deleteBucket(id: number, user): Promise<void> {
    await this.bucketRepository.deleteBucket(id, user);
    return;
  }

  async updateBucket(body: UpdateBucketDto, id: number, user): Promise<Bucket> {
    const { cycle } = body;

    const isBucket = await this.bucketRepository.findOneById(id);

    if (!isBucket) {
      throw new BadRequestException('삭제된 장바구니 입니다.');
    }

    if (isBucket.UserId !== user.id) {
      throw new BadRequestException('권한이 없습니다.');
    }

    isBucket.cycle = cycle;
    return await this.bucketRepository.save(isBucket);
  }
}
