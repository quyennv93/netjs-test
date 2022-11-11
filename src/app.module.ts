import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PostModule,
    UserModule,
    // ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: ormConfig,
    //   inject: [ConfigService],
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'test',
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: true,
      username: 'root',
      password: '123456',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
