import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Items } from '../entities/item';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectRepository(Items) private itemRepository: Repository<Items>,
  ) {}

  async createItem(body) {
    const { CategoryId, name, link } = body;
    const newItem = this.itemRepository.create();
    newItem.name = name;
    newItem.link = link;
    newItem.CategoryId = CategoryId;
    return await this.itemRepository.save(newItem);
  }

  async deleteBucket(id: number) {
    return await this.itemRepository.delete({ id });
  }
}
