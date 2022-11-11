import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-use';
import { JwtUserGuard } from 'src/common/guard/jwt-user.guard';
import { User } from 'src/user/user.entity';
import { CreatePostDto } from './dto/create-post-dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(JwtUserGuard)
  @ApiBearerAuth()
  async create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: User,
  ) {
    return await this.postService.create(user, createPostDto);
  }
  @Get()
  async findAll() {
    return this.postService.findAll();
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOneById(id);
  }
}
