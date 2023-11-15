import { Injectable } from '@nestjs/common';
import { ItemRepository } from './item.repository';

@Injectable()
export class ItemService {
  constructor(private itemRepository: ItemRepository) {}

  async getItemListByCategory(categoryId: number) {
    return await this.itemRepository.findItemListByCategory(categoryId);
  }

  async addItem(body) {
    return await this.itemRepository.createItem(body);
  }

  async deleteItem(itemId: number) {
    await this.itemRepository.deleteBucket(itemId);
    return;
  }

  async getCategoryList() {
    return await this.itemRepository.findCategoryList();
  }
}
