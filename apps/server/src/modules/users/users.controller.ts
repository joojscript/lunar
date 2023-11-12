import { Public } from '@/decorators/public.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from './users.dtos';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserInput) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findMany({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedUserDto: UpdateUserInput) {
    return this.usersService.updateUser({
      where: { id },
      data: updatedUserDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser({ id });
  }
}
