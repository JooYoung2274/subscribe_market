import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Categories } from '../entities/category';
import { Repository } from 'typeorm';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(
    private itemRepository: ItemRepository,
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
  ) {}

  async getItemListByCategory(param) {
    // const categoryId = Number(param.CategoryId);
    // return await this.itemRepository.find({
    //   where: { CategoryId: categoryId },
    // });
  }

  async addItem(body) {
    return await this.itemRepository.createItem(body);
  }

  async deleteItem(param) {
    const itemId = Number(param.ItemId);
    await this.itemRepository.deleteBucket(itemId);
    return;
  }

  async getCategoryList() {
    return await this.categoryRepository.find({});
  }
}
