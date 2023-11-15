import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from './item.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('상품 관련 API')
@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @ApiOperation({ summary: '특정 카테고리 상품 리스트 불러오기' })
  @ApiBearerAuth('access-token')
  @ApiParam({ name: 'CategoryId', description: '카테고리 id', example: 1 })
  @Get(':categoryId')
  @UseGuards(AuthGuard('jwt'))
  async getItemListByCategory(@Param('categoryId') categoryId: number) {
    return await this.itemService.getItemListByCategory(categoryId);
  }

  @ApiOperation({
    summary:
      '상품 등록하기.. 이건 어떻게 해야할지 모르겠음. 어드민페이지에서 사용해야하나?',
  })
  @Post()
  async addItem(@Body() body) {
    return await this.itemService.addItem(body);
  }

  @ApiOperation({ summary: '상품 삭제하기' })
  @ApiBearerAuth('access-token')
  @ApiParam({ name: 'ItemId', description: '상품 id', example: 1 })
  @Delete(':itemId')
  async deleteItem(@Param('itemId') itemId: number) {
    return await this.itemService.deleteItem(itemId);
  }

  @ApiOperation({ summary: '카테고리 리스트 불러오기' })
  @Get('category/list')
  async getCategoryList() {
    return await this.itemService.getCategoryList();
  }
}
