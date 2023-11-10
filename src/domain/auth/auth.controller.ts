import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Oauth } from '../entities/oauth';

@ApiTags('oauth 관련 API')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('test/token')
  async testToken() {
    const user = plainToClass(Oauth, {
      id: 1,
      email: 'test@test.com',
      photo: 'https://pbs.twimg.com/media/E8KrbUzVEAcBaun.png',
    });
    return await this.authService.login(user);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async signWithGoogle() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async signWithGoogleRedirect(@Req() req) {
    return await this.authService.signWithGoogle(req.user);
  }
}
