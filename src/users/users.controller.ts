import { UseInterceptors, Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException,Session } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './users.entity';
@Controller('auth')
@serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(private userServices: UsersService, private authSerVice : AuthService) { }
    
    // @Get('/colors/:color')
    // setColor(@Param('color') color:string, @Session() session:any){
    //     session.color = color
    // }


    // @Get('/colors')
    // getColor(@Session() session:any){
    //     return session.color
    // }

    @Get('/whoami')
    whoami(@CurrentUser() user: User){
        console.log(user)
        return user
    }

    @Post('/signout')
    signOut(@Session() session:any){
        session.userId = null
    }
    
    @Post('/signup')
   async  createUser(@Body() body: createUserDto, @Session() session:any) {
        const user =  await this.authSerVice.signup(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post('/signin')
    async signin(@Body() body: createUserDto , @Session() session:any){
        const user = await this.authSerVice.signin(body.email,body.password)
        session.userId = user.id
        return user
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
