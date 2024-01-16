import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUserService: Partial<UsersService>
  let fakeAuthService: Partial<AuthService>
  beforeEach(async () => {

    fakeUserService = {
      findOne:(id:number)=>Promise.resolve({id,email:'asd@asd.com',password:'asd'} as User),
      find:(email:string)=>Promise.resolve([{id:1,email,password:"123"} as User]),
      // remove:()=>{},
      // create:()=>{}
    }
    fakeAuthService ={
      // signup: ()=>{},
      signin: (email:string, password:string)=> Promise.resolve({id:1,email,password} as User)
    }
    const module: TestingModule = await Test.createTestingModule({
    
      controllers: [UsersController],
      providers:[
        {provide: UsersService, useValue: fakeUserService},
        {provide: AuthService, useValue: fakeAuthService}
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all user and return a list of user with given email',async ()=>{
    const user = await controller.findAllUser('asdf@asdf.com')
    expect(user.length).toEqual(1)
    expect(user[0].email).toEqual('asdf@asdf.com')
  })

  it('findUser return a single user with the given Id', async ()=>{
    const user = await controller.findUser('1')
    expect(user).toBeDefined()
  })
  it('findUser throws an error if user with given id is not found', async () => {
    fakeUserService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });


  it("signin updates session object and returns user", async ()=>{
    const session ={userId:-10}
    const user = await controller.signin({
      email:"asd@asd.com",
      password:"1234",
      
    },session)
    expect(user.id).toEqual(1)
    expect(session.userId).toEqual(1)
  })
});
