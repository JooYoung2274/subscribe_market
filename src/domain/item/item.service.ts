import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from '../entities/item';
import { Categories } from '../entities/category';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Items) private itemRepository: Repository<Items>,
    @InjectRepository(Categories)
    private categoryRepository: Repository<Categories>,
  ) {}

  async getItemListByCategory(param) {
    const categoryId = Number(param.CategoryId);
    return await this.itemRepository.find({
      where: { CategoryId: categoryId },
    });
  }

  async addItem(body) {
    const { CategoryId, name, link } = body;
    const newItem = this.itemRepository.create();
    newItem.name = name;
    newItem.link = link;
    newItem.CategoryId = CategoryId;
    return await this.itemRepository.save(newItem);
  }

  async deleteItem(param) {
    const itemId = Number(param.ItemId);

    return await this.itemRepository.delete({ id: itemId });
  }

  async getCategoryList() {
    return await this.categoryRepository.find({});
  }
}
