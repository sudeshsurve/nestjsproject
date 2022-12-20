import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { PlayerDocument, player } from '../schema/player.schema';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class PlayersService {
    constructor(@InjectModel(player.name) private PlayerModel: Model<PlayerDocument>) {}
    players : string[] = ['player1 ' , 'player2' , 'player3' , 'player4' , 'player5' , 'player6']

    async create(){

    }

}
