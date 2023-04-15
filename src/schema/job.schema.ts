import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { address, addressschema } from "./common/address.schema";
import { user } from "./user.schema";
import { Document    } from "mongoose";

@Schema()
export class job {
        @Prop({ type: Types.ObjectId, ref: user.name, required: true })
        Employer: user | Types.ObjectId

        @Prop()
        designation: string

        @Prop()
        experience: string  

        @Prop()
        jobRole: string

}

export type jobDocument = job  & Document

export const jobSchema  = SchemaFactory.createForClass(job)

// function populateuser(next :Function) {
//         this.populate({path :"Employer" , select : {name : 1 ,  email:1} })
//         next()   
// }

// jobSchema.pre('find' , populateuser)
// jobSchema.pre('findOne' ,populateuser)

