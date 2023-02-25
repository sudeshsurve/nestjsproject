import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { address, addressschema } from "./common/address.schema";
import { Document , Schema as MongooseSchema  } from "mongoose";

@Schema()
export class user extends Document{
@Prop()
name:string

@Prop()
gender: string

@Prop({
required: true
})
email: string

@Prop() 
phone : number

@Prop()
paid_date : Date

@Prop({required: true})
password : string    

@Prop({
    type : Boolean,
    default : false
})  

isdeleted : boolean

@Prop({type : addressschema}) 
address : address
}
    
export type userDocument = user & Document

export const userschema = SchemaFactory.createForClass(user)

userschema.pre('save' ,async function (next:Function) {
 
})