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
        console.log("inside validareuser");
        if(!user){
          return null
        }
      const ismatch = bcrypt.compareSync(password , user.password)
        if (user && ismatch) {
          return  user
        }  else{
          return null
        }
      } 



      async getToken(userDto:any){
        // const payload = { username: userDto.username, email: userDto.email , role : userDto.role , userID: userDto._id };
        // return {
        //   access_token: this.jwtService.sign(payload , { expiresIn: '60s' }),
        //   refresh_token: this.jwtService.sign(payload , { expiresIn: '7d'})
        //  }; 
      }
a

    async signup(userDto:any){ 
      try {
        console.log(userDto);
        const useremail= await this.userModel.findOne({email:userDto.email})
        if(useremail){
          throw new BadRequestException('User Already Exist', { cause: new Error(), description: 'Bad Request' })
        }
        const hash = await bcrypt.hash(userDto.password , 10)
        const createuser = new this.userModel({...userDto , password:hash})
          let newUser = await createuser.save()
          let tokens = await this.getTokens(newUser)
          await this.updateRefreshToken(newUser._id , tokens.refreshToken)
          return tokens
      } catch (error) {
        console.log(error.response);   
        return error.response
      }
    }

    async getTokens(userDto:any) {
      const payload = { username: userDto.username, email: userDto.email , role : userDto.role , userID: userDto._id };
      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync(
         payload,
          {
            expiresIn: '15m',
          },
        ),
        this.jwtService.signAsync(
         payload,
          {
            expiresIn: '7d',
          },
        ),
      ]);
      return {
        accessToken,
        refreshToken,
      };
    }


    async updateRefreshToken(userId: string, refreshToken: string) {
      await this.userModel.findByIdAndUpdate(userId, {
        refreshToken: refreshToken,
      });
    }

    async logout(userId:string){
      return new Promise((resolve, reject) => {
      this.userModel.findByIdAndUpdate(userId, { refreshToken: null }).then((res)=>{
      console.log(res);
      resolve({status:true , mag:'logout successfully'})
     }) 
      })
    }
}
