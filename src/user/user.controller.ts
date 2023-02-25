import { Body, Controller, Post , Put } from '@nestjs/common';
import { Get, Param, Query } from '@nestjs/common/decorators';
import { UserService } from './user.service';
import { check } from 'email-existence';
import { log } from 'console';


@Controller('user')
export class UserController {
   constructor(private readonly userservice: UserService) { }

   @Post()
   createUser(@Body() userDto: any) {
      return this.userservice.createUser(userDto ) 
   }

   @Get('/all_user')
   get_all_user() {
      return this.userservice.get_all_users()
   }

   @Post('/search')
   serach_data(@Query() date: any) {
      return this.userservice.serach_data(date)
   }

   @Post('/remove/:_id')
   remove_user(@Param() _id: string) {
      console.log(_id)
      return this.userservice.remove_user(_id)
   }

   @Post('/search_user')
   search_by_text(@Query('text') query: string){
      console.log(query);
      return this.userservice.search_by_query(query)
   }
}
