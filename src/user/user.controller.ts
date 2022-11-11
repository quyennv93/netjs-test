import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-use';
import { JwtUserGuard } from 'src/common/guard/jwt-user.guard';
import { LocalAuthGuard } from 'src/common/guard/local-auth.guard';
import { CreateUserDto } from './dto/create-user';
import { LoginDto } from './dto/login-user';
import { User } from './user.entity';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return await this.userService.register(body);
  }
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UsePipes(ValidationPipe)
  async login(@Body() loginUserDto: LoginDto, @CurrentUser() user: User) {
    return await this.userService.generateToken(user);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.userService.findById(id);
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
  @Get('me')
  @UseGuards(JwtUserGuard)
  @ApiBearerAuth()
  getMyAccount(@CurrentUser() user: User) {
    return this.userService.findById(user.id);
  }
}
