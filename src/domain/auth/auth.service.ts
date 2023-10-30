import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { InjectRepository } from '@nestjs/typeorm';
import { Oauth } from '../entities/oauth';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/createAuth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Oauth) private oauthRepository: Repository<Oauth>,
    private jwtService: JwtService,
  ) {}

  async signWithGoogle(user) {
    if (!user) throw new BadRequestException();

    try {
      console.log('Login User email :  ', user.email);
      const newUser: CreateAuthDto = {
        email: user.email,
        photo: user.photos,
        accessToken: user.accessToken,
      };

      const isOauth = await this.getOauth(user.email);

      if (isOauth) {
        return await this.login(isOauth);
      }

      const newOauth = await this.createOauth(newUser);
      return await this.login(newOauth);
    } catch (e) {
      throw new Error(e);
    }
  }

  async getOauth(email: string) {
    return await this.oauthRepository.findOne({ where: { email: email } });
  }

  async createOauth(newUser) {
    const newOauth = this.oauthRepository.create();
    newOauth.email = newUser.email;
    newOauth.photo = newUser.photo;
    return await this.oauthRepository.save(newOauth);
  }

  async login(user: Oauth) {
    if (!user) throw new BadRequestException();

    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRE_TIME,
        },
      ),

      email: user.email,
      photo: user.photo,
    };
  }
}
