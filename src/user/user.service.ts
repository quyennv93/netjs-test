import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private userRepo: Repository<User>) { }
  async createUser(body: CreateUserDto) {
    try{
      let user = await this.userRepo.save(body);
      return user;
    }catch(err){
      console.log(err);
      
    }
   
  }
 async findAll() {
   return await this.userRepo.find(); 
 }
 async findById(id:number){
   let user = await this.userRepo.findOne({
     where: {id},
     relations:['user'],
   })
   if(user) {
     return {user}
   }
   return 'not found';
 }
 async delete(id:number){
   let user = await this.userRepo.findOne({
     where: {id},
   })
   if(user){
    await this.userRepo.delete(id)
    return 'delete done'
   }
   return 'not found'
 }
}
