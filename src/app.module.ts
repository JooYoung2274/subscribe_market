import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './domain/auth/auth.module';
import { ItemModule } from './domain/item/item.module';
import { UserModule } from './domain/user/user.module';
import { BucketModule } from './domain/bucket/bucket.module';
import { SubscribeModule } from './domain/subscribe/subscribe.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule.forRoot(),
    AuthModule,
    UserModule,
    BucketModule,
    ItemModule,
    SubscribeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
