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
import { SubscribeService } from './subscribe.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateSubscribeDto } from './dto/CreateSubscribeDto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateSubscribeDto } from './dto/UpdateSubscribeDto';
import { User } from 'src/common/decorator/user.decorator';

@ApiTags('구독 관련 API')
@Controller('subscribe')
export class SubscribeController {
  constructor(private subscribeService: SubscribeService) {}

  @ApiOperation({ summary: '구독 리스트 추가' })
  @ApiBearerAuth('access-token')
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createSubscribe(@Body() body: CreateSubscribeDto, @User() user) {
    return await this.subscribeService.createSubscribe(body, user);
  }

  @ApiOperation({ summary: '구독 주기 변경' })
  @ApiBearerAuth('access-token')
  @ApiParam({ name: 'subscribeId', description: '구독 id', example: 1 })
  @Put(':subscribeId')
  @UseGuards(AuthGuard('jwt'))
  async updateSubscribe(
    @Body() body: UpdateSubscribeDto,
    @Param('subscribeId') subscribeId: number,
    @User() user,
  ) {
    return await this.subscribeService.updateSubscribe(body, subscribeId, user);
  }

  @ApiOperation({ summary: '구독 리스트 삭제' })
  @ApiBearerAuth('access-token')
  @ApiParam({ name: 'subscribeId', description: '구독 id', example: 1 })
  @Delete(':subscribeId')
  @UseGuards(AuthGuard('jwt'))
  async deleteSubscribe(
    @Param('subscribeId') subscribeId: number,
    @User() user,
  ) {
    return await this.subscribeService.deleteSubscribe(subscribeId, user);
  }

  @ApiOperation({ summary: '구독 리스트 불러오기' })
  @ApiBearerAuth('access-token')
  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  async getSubscribeList(@User() user) {
    return await this.subscribeService.getSubscribeList(user);
  }

  @Get('onboard')
  @UseGuards(AuthGuard('jwt'))
  async getOnboardItem() {}
}
