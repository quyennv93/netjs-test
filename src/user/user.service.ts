import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  async createUser(name: string) {
    await this.userRepo.save({ name });
    return name;
  }
}
