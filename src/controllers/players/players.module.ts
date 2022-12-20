import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { MongooseModule } from '@nestjs/mongoose';
import { player, playerSchema } from '../schema/player.schema';

@Module({
  imports:[MongooseModule.forFeature([{ name: player.name, schema: playerSchema }])] ,
  controllers: [PlayersController],
  providers: [PlayersService]
})
export class PlayersModule {}
