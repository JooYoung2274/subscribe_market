import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bucket } from 'src/domain/entities/Bucket';
import { Alarm } from 'src/domain/entities/alarm';
import { Categories } from 'src/domain/entities/category';
import { Items } from 'src/domain/entities/item';
import { Oauth } from 'src/domain/entities/oauth';
import { SubscribeList } from 'src/domain/entities/subscribeList';
import { Users } from 'src/domain/entities/user';

const databaseModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
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
