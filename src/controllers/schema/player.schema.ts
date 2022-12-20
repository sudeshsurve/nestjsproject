import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PlayerDocument = HydratedDocument<player>;

@Schema()
export class player {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  sport: string;

  @Prop()
   rank:number
}

export const playerSchema = SchemaFactory.createForClass(player);