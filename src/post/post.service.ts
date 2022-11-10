import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { CreatePostDto } from './dto/create-post-dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository (Post)
        private readonly PostRepo:Repository<Post>
    ){}
    async create (user:User,post:CreatePostDto){
        const newPost = await this.PostRepo.create({...post,user:user})
        return await this.PostRepo.save(newPost)
    }
}
