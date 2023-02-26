import { Controller } from '@nestjs/common';
import { Request, Post, UseGuards, Body, Get ,Req, Param } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { userDto } from '../user/user.dto';

@Controller('auth')
export class AuthController { 
    constructor(private authService : AuthService){}

    @Post('/login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() req) {
      let tokens = await this.authService.getTokens(req.user)
      await this.authService.updateRefreshToken(req.user._id , tokens.refreshToken)
      return tokens
    }

    @Post('/signup')      
    async signup(@Body() userDto : any){
      return this.authService.signup(userDto)
    }

    @Get('/users')
    @UseGuards(AuthGuard("jwt"))
    async getuserdata(){
     return "this is  private route "
    }

    @Get('logout/:id')
    logout(@Param('id') id: string) {
     return this.authService.logout(id);
    }
}       
