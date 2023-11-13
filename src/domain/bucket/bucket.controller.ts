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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorator/user.decorator';
import { CreateBucketDto } from './dto/CreateBucketDto';

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
  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async deleteBucket(@Param() param, @User() user) {
    return await this.bucketService.deleteBucket(param, user);
  }

  @ApiOperation({ summary: '장바구니 알람주기 변경' })
  @ApiBearerAuth('access-token')
  @Put()
  @UseGuards(AuthGuard('jwt'))
  async updateBucket(@Body() body, @Param() param, @User() user) {
    return await this.bucketService.updateBucket(body, param, user);
  }
}
