import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class address {
@Prop()
country : string

@Prop()
state : string

@Prop()
city : string

@Prop()
zipcode : string
}

export const addressschema = SchemaFactory.createForClass(address)

