import { Body, Controller, Get, Post,Param ,Delete} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() body:CreateUserDto) {
    return await this.userService.createUser(body);
  }
  @Get()
  findAll() {
    return this.userService.findAll()
  }
  @Get(':id')
  findOneById(@Param('id') id:number) {
    return this.userService.findById(id)
  }
  @Delete(':id')
  delete(@Param('id') id:number) {
    return this.userService.delete(id)
  }

}
