import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Module({
  imports: [UserModule,TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
  exports:[PostService,TypeOrmModule]
})
export class PostModule {}
