import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async register(body: CreateUserDto): Promise<CreateUserDto> {
    const hashPassword = await this.hashPassword(body.password);
    await this.userRepo.save({
      ...body,
      password: hashPassword,
    });
    return body;
  }
  async login(username: string, password: string) {
    const user = await this.findOneByUsername(username);
    if (user) {
      if (await this.comparePassword(password, user.password)) {
        return user;
      }
    }
    throw new UnauthorizedException();
  }

  async generateToken(payload: User) {
    return this.jwtService.sign({
      id: payload.id,
    });
  }

  async hashPassword(password: string): Promise<any> {
    return await bcrypt.hash(password, 12);
  }
  async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }
  async findAll() {
    return await this.userRepo.find();
  }
  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepo.findOne({ where: { username } });
  }
  async findById(id: number): Promise<User> {
    return await this.userRepo.findOne({
      where: { id },
      relations: ['posts'],
    });
  }
  async delete(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
    });
    if (user) {
      await this.userRepo.delete(id);
      return 'delete done';
    }
    return 'not found';
  }
}
