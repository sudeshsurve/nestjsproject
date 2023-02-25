import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserDocument } from './AuthSchema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { userDto } from '../user/user.dto';
@Injectable()
export class AuthService {

    constructor( @InjectModel('auth')  private readonly  userModel: Model<UserDocument>  ,private jwtService: JwtService){}
    async validateUser(email: string, password: string ):Promise<any>{
        const user = await this.userModel.findOne({email}); 
        if(!user){
          return null
        }
        const ismatch = await bcrypt.compare(password , user.password)
        if (user && ismatch) {
          return  user
        }  else{
          return null
        }
      } 



      async getToken(userDto:any){
        const payload = { username: userDto.username, email: userDto.email , role : userDto.role , userID: userDto._id };
        return {
          access_token: this.jwtService.sign(payload),
         };  
      }


    async signup(userDto:userDto){ 
      try {
        console.log(userDto);
        const useremail= await this.userModel.findOne({email:userDto.email})
        if(useremail){
          throw new BadRequestException('User Already Exist', { cause: new Error(), description: 'Bad Request' })
        }
        const hash = await bcrypt.hash(userDto.password , 10)
        const createuser = await new this.userModel({...userDto , password:hash})
        return createuser.save()
      } catch (error) {
        console.log(error.response);   
        return error.response
      }
     
    }



}
