import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './AuthSchema/user.schema';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { MailModule } from './mail/mail.module';

@Module({
    imports:[ PassportModule ,
      MongooseModule.forFeature([{ name: "auth", schema: UserSchema }]),
        JwtModule.register({  
            secret: jwtConstants.secret,
          }),
        MailModule,] , 
  controllers: [AuthController],
  providers: [AuthService , LocalStrategy , JwtStrategy],
})
export class AuthModule {
   
}
