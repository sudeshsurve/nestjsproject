
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User_Role } from 'src/comman_enum/user_role.enum';

export type  UserDocument  = user & Document

@Schema({versionKey:false})
export class user {
  @Prop()
  username:string

  @Prop()
  email:string

  @Prop()
  password:string

  @Prop({
    type : String,
    enum: User_Role,
    required: true
  })
  role: User_Role

  @Prop()
  city:  string

  @Prop()
  state: string

  @Prop()
  gender: string

  @Prop()
  age: number

  @Prop()
  refreshToken?: string;
}
export const UserSchema  = SchemaFactory.createForClass(user)