import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      // imports: [ConfigModule],
      // inject: [ConfigService],
      // useFactory: async (ConfigService: ConfigService) => ({
      //   secret: ConfigService.get<string>('1993'),
      // }),
      secret: '1993',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, LocalStrategy], // services: repo, service, ...
  exports: [UserService, TypeOrmModule, JwtModule],
})
export class UserModule {}
