import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bucket } from 'src/domain/entities/bucket';
import { Alarm } from 'src/domain/entities/alarm';
import { Categories } from 'src/domain/entities/category';
import { Items } from 'src/domain/entities/item';
import { Oauth } from 'src/domain/entities/oauth';
import { SubscribeList } from 'src/domain/entities/subscribeList';
import { Users } from 'src/domain/entities/user';

const databaseModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: () => {
    return {
      type: 'postgres',
      host: process.env.DB_HOST_POSTGRES,
      port: 30995,
      username: process.env.DB_USERNAME_POSTGRES,
      password: process.env.DB_PASSWORD_POSTGRES,
      database: process.env.DB_DATABASE_POSTGRES,
      entities: [Oauth, Users, Bucket, Categories, Items, Alarm, SubscribeList],
      autoLoadEntities: true,
      charset: 'utf8mb4',
      synchronize: true,
      logging: true,
      // keepConnectionAlive: true,
    };
  },
});

@Module({
  imports: [databaseModule],
  exports: [databaseModule],
})
export class DatabaseModule {
  public static forRoot() {
    return {
      module: DatabaseModule,
    };
  }
}
