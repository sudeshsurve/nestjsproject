import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailModule } from 'src/auth/mail/mail.module';
import { user, userschema } from 'src/schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[MongooseModule.forFeature([{name : user.name , schema : userschema}])  , MailModule],
  controllers: [UserController],
  providers: [UserService  ],
  exports:[UserService]
})
export class UserModule {}
