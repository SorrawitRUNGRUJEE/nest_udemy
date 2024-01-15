import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
@Controller('auth')
@serialize(UserDto)
export class UsersController {
    constructor(private userServices: UsersService) { }
    @Post('/signup')
    createUser(@Body() body: createUserDto) {
        return this.userServices.create(body.email, body.password)
    }
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = this.userServices.findOne(parseInt(id))
        if (!user) throw new NotFoundException('user not found')
        return user
    }
    @Get()
    findAllUser(@Query('email') email: string) {
        return this.userServices.find(email)
    }
    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userServices.remove(parseInt(id))
    }
    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userServices.update(parseInt(id), body)
    }
}
