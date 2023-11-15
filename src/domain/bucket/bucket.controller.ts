import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BucketService } from './bucket.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/common/decorator/user.decorator';
import { CreateBucketDto } from './dto/CreateBucketDto';
import { UpdateBucketDto } from './dto/UpdateBucketDto';

@ApiTags('장바구니 관련 API')
@Controller('bucket')
export class BucketController {
  constructor(private bucketService: BucketService) {}

  @ApiOperation({ summary: '장바구니 등록하기' })
  @ApiBearerAuth('access-token')
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createBucket(@Body() body: CreateBucketDto, @User() user) {
    return await this.bucketService.createBucket(body, user);
  }

  @ApiOperation({ summary: '장바구니 불러오기' })
  @ApiBearerAuth('access-token')
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getBucket(@User() user) {
    return await this.bucketService.getBucket(user);
  }

  @ApiOperation({ summary: '장바구니 삭제' })
  @ApiBearerAuth('access-token')
  @ApiParam({ name: 'id', description: '장바구니 id', example: 1 })
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteBucket(@Param('id') id: number, @User() user) {
    return await this.bucketService.deleteBucket(id, user);
  }

  @ApiOperation({ summary: '장바구니 알람주기 변경' })
  @ApiBearerAuth('access-token')
  @ApiParam({ name: 'id', description: '장바구니 id', example: 1 })
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateBucket(
    @Body() body: UpdateBucketDto,
    @Param('id') id: number,
    @User() user,
  ) {
    return await this.bucketService.updateBucket(body, id, user);
  }
}
