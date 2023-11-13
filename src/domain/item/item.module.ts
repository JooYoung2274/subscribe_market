import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from '../entities/item';
import { Categories } from '../entities/category';
import { ItemRepository } from './item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Items, Categories])],
  controllers: [ItemController],
  providers: [ItemService, ItemRepository],
})
export class ItemModule {}
