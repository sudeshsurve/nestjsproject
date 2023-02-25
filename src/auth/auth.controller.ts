import { Controller } from '@nestjs/common';
import { Request, Post, UseGuards, Body, Get } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { userDto } from '../user/user.dto';

@Controller('auth')
export class AuthController { 
    constructor(private authService : AuthService){}

    @Post('/login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req) {
      console.log(req.user);
        return this.authService.getToken(req.user) 
    }

    @Post('/signup')      
    async signup(@Body() userDto : userDto){
      return this.authService.signup(userDto)
    }

    @Get('/users')
    @UseGuards(AuthGuard("jwt"))
    async getuserdata(){
     return "this is  private route "
    }
}       
